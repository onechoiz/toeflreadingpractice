import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, getDocs, increment, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/authContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Key, Send, Plus, Trash2, Pencil, Layout, Database, ShoppingBag, Eye, BookOpen } from 'lucide-react';

interface AdminDashboardProps {
  onPreviewTask?: (task: any) => void;
}

export default function AdminDashboard({ onPreviewTask }: AdminDashboardProps) {
  const { profile } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [keys, setKeys] = useState<any[]>([]);
  const [newKeyValue, setNewKeyValue] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTasks, setCustomTasks] = useState<any[]>([]);
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTask, setPreviewTask] = useState<any>(null);
  const [taskImageUrl, setTaskImageUrl] = useState('');
  const [taskCategory, setTaskCategory] = useState<'vocabulary' | 'everyday' | 'academic'>('everyday');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskType, setTaskType] = useState('visual');
  const [taskBody, setTaskBody] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [taskQuestions, setTaskQuestions] = useState<{question: string, options: string[], answer: number, explanation: string}[]>([
    { question: '', options: ['', '', '', ''], answer: 0, explanation: '' }
  ]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const resetForm = () => {
    setTaskTitle('');
    setTaskBody('');
    setBulkText('');
    setTaskImageUrl('');
    setTaskCategory('everyday');
    setTaskType('visual');
    setTaskQuestions([{ question: '', options: ['', '', '', ''], answer: 0, explanation: '' }]);
    setEditingTaskId(null);
    setPreviewTask(null);
  };

  const handleEditTask = (task: any) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskCategory(task.category);
    setTaskType(task.type);
    setTaskImageUrl(task.imageUrl || '');
    
    // Attempt to reconstruct body from content
    if (Array.isArray(task.content)) {
      setTaskBody(task.content.join('\n\n'));
    } else if (typeof task.content === 'string') {
      setTaskBody(task.content);
    } else {
      setTaskBody(task.content.body || task.content.header || '');
    }
    
    setTaskQuestions(task.questions.map((q: any) => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation || ''
    })));
    
    setIsBulkMode(false);
    setShowTaskModal(true);
  };

  const parseBulkText = () => {
    try {
      const parts = bulkText.split('---');
      if (parts.length < 2) throw new Error('Format: [Passage] --- [Questions]');
      
      const passage = parts[0].trim();
      const questionsStr = parts[1].trim();
      
      const qBlocks = questionsStr.split(/\d+\.\s/).filter(b => b.trim().length > 0);
      
      const parsedQuestions = qBlocks.map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const question = lines[0];
        const options = lines.filter(l => /^[A-D]\)/i.test(l)).map(l => l.replace(/^[A-D]\)\s*/i, ''));
        const answerLine = lines.find(l => /^Answer:/i.test(l));
        const explanationLine = lines.find(l => /^Explanation:/i.test(l));
        
        let answerIndex = 0;
        if (answerLine) {
          const ansChar = answerLine.split(':')[1].trim().toUpperCase();
          answerIndex = ansChar.charCodeAt(0) - 65; 
        }

        return {
          question,
          options: options.length === 4 ? options : ['A', 'B', 'C', 'D'],
          answer: isNaN(answerIndex) ? 0 : answerIndex,
          explanation: explanationLine ? explanationLine.split(':')[1].trim() : ''
        };
      });

      return { passage, questions: parsedQuestions };
    } catch (e) {
      alert('Error parsing bulk text. Format: [Passage] --- [Questions]');
      return null;
    }
  };

  const convertDriveLink = (url: string) => {
    if (!url) return '';
    // Handle drive.google.com/file/d/ID/...
    const docMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (docMatch && url.includes('drive.google.com')) {
      return `https://drive.google.com/uc?export=view&id=${docMatch[1]}`;
    }
    // Handle drive.google.com/open?id=ID
    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch && url.includes('drive.google.com')) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
    return url;
  };

  const handleAddTask = () => {
    let finalBody = taskBody;
    let finalQuestions = taskQuestions;

    if (isBulkMode) {
      const result = parseBulkText();
      if (!result) return;
      finalBody = result.passage;
      finalQuestions = result.questions;
    }

    if (!taskTitle) {
      alert('Please enter a title');
      return;
    }
    
    if (!finalBody.trim() && !taskImageUrl.trim()) {
      alert('Please provide either text content or an image URL');
      return;
    }

    const processedImageUrl = convertDriveLink(taskImageUrl);

    const taskData = {
      title: taskTitle,
      type: taskType,
      imageUrl: processedImageUrl,
      content: (taskCategory === 'academic' || taskCategory === 'vocabulary') ? finalBody.split('\n').filter(l => l.trim()) : {
        header: taskTitle,
        body: finalBody,
        subject: taskType === 'email' ? taskTitle : undefined,
        from: taskType === 'email' ? 'Contact' : undefined,
        to: taskType === 'email' ? 'Student' : undefined,
        items: taskType === 'announcement' || taskType === 'visual' || taskType === 'schedule' ? finalBody.split('\n').filter(l => l.trim()) : [],
        messages: taskType === 'chat' ? finalBody.split('\n').map(l => {
          const match = l.match(/^([^:]+):\s*(.*)/);
          return match ? { sender: match[1], text: match[2] } : { sender: 'System', text: l };
        }) : []
      },
      questions: taskCategory === 'vocabulary' ? [] : finalQuestions.map((q, i) => ({
        id: editingTaskId ? (finalQuestions[i] as any).id || `custom-${Date.now()}-${i}` : `custom-${Date.now()}-${i}`,
        ...q
      })),
      updatedAt: serverTimestamp(),
      category: taskCategory
    };

    if (!editingTaskId) {
      (taskData as any).createdAt = serverTimestamp();
    }

    setPreviewTask(taskData);
    setShowPreviewModal(true);
  };

  const publishTask = async () => {
    if (!previewTask) return;
    setIsPublishing(true);
    try {
      if (editingTaskId) {
        await updateDoc(doc(db, 'customTasks', editingTaskId), previewTask);
        alert('Practice task updated!');
      } else {
        await addDoc(collection(db, 'customTasks'), previewTask);
        alert('Practice task published!');
      }
      setShowPreviewModal(false);
      setShowTaskModal(false);
      resetForm();
    } catch (error) {
      alert('Failed to publish task. Check permissions or data format.');
      handleFirestoreError(error, editingTaskId ? OperationType.UPDATE : OperationType.WRITE, `customTasks/${editingTaskId || 'new'}`);
    }
    setIsPublishing(false);
  };

  useEffect(() => {
    // Listen for pending requests
    const q = query(collection(db, 'requests'), where('status', '==', 'pending'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Listen for recent keys
    const q = query(collection(db, 'keys'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setKeys(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'customTasks'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCustomTasks(snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((task: any) => !task.deleted) // Filter out soft-deleted tasks
        .sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds)
      );
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'customTasks');
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteTask = async () => {
    if (!taskIdToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'customTasks', taskIdToDelete));
      setShowDeleteConfirm(false);
      setTaskIdToDelete(null);
    } catch (error) {
      alert('Failed to delete task. Check your permissions.');
      handleFirestoreError(error, OperationType.DELETE, `customTasks/${taskIdToDelete}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderTextPreview = (input: string | string[]) => {
    if (!input) return null;
    const lines = Array.isArray(input) ? input : input.split('\n');
    return lines.map((line, lIdx) => {
      if (!line.trim()) return <br key={lIdx} />;
      
      if (taskCategory === 'vocabulary' || (previewTask && previewTask.category === 'vocabulary')) {
        const parts = [];
        let currentPos = 0;
        const regex = /\{([^}]+)\}/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
          if (match.index > currentPos) {
            parts.push(<span key={`text-${match.index}`}>{line.substring(currentPos, match.index)}</span>);
          }
          const answer = match[1];
          const gapLength = answer.length;
          parts.push(
            <span key={`blank-${match.index}`} className="inline-flex flex-col items-center mx-1 relative translate-y-[2px]">
              <span className="font-black text-brand-blue font-mono text-base md:text-xl tracking-[0.5ch] pl-[0.5ch] leading-none mb-[2px]">
                {answer}
              </span>
              <div className="flex gap-[0.5ch] h-[2px]">
                {Array.from({ length: gapLength }).map((_, i) => (
                  <div key={i} className="h-full w-[1ch] bg-brand-blue/40 rounded-full" />
                ))}
              </div>
            </span>
          );
          currentPos = regex.lastIndex;
        }
        if (currentPos < line.length) {
          parts.push(<span key="text-end">{line.substring(currentPos)}</span>);
        }
        return <div key={lIdx} className="mb-6 leading-[3] text-lg">{parts}</div>;
      }

      const chatMatch = line.match(/^([^(\n]+)\s*\(([^)\n]+)\)/i);
      if (chatMatch) {
        const name = chatMatch[1].trim();
        const time = chatMatch[2].trim();
        const message = line.substring(chatMatch[0].length).trim();
        return (
          <div key={lIdx} className="flex flex-col mb-4 items-start">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="font-black text-[8px] uppercase tracking-widest text-gray-400">{name}</span>
              <span className="text-[7px] font-bold text-gray-300">{time}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl border-2 border-black/5 text-xs font-bold shadow-sm">
              {message || <span className="opacity-50 italic">...</span>}
            </div>
          </div>
        );
      }
      
      const dialogueMatch = line.match(/^([^:\n]+):\s*(.*)/);
      if (dialogueMatch) {
        return (
          <div key={lIdx} className="mb-3">
            <span className="font-black uppercase text-[8px] tracking-widest text-brand-blue block mb-0.5">{dialogueMatch[1]}</span>
            <div className="bg-gray-50 border-l-4 border-black p-3 font-bold text-xs">
              {dialogueMatch[2]}
            </div>
          </div>
        );
      }

      return <div key={lIdx} className="mb-2 text-sm font-medium">{line}</div>;
    });
  };

  const handleApprove = async (request: any) => {
    try {
      // 1. Update user credits
      const userRef = doc(db, 'users', request.userId);
      await updateDoc(userRef, {
        credits: increment(request.amount || 50),
        updatedAt: serverTimestamp()
      });
      // 2. Mark request as approved
      await updateDoc(doc(db, 'requests', request.id), {
        status: 'approved'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${request.userId}`);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await updateDoc(doc(db, 'requests', requestId), {
        status: 'rejected'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `requests/${requestId}`);
    }
  };

  const generateKey = async () => {
    setIsGenerating(true);
    const keyString = Math.random().toString(36).substring(2, 10).toUpperCase();
    try {
      await addDoc(collection(db, 'keys'), {
        key: keyString,
        value: newKeyValue,
        used: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'keys');
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 pb-24">
      {/* Task Creation Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl border-neo-lg shadow-neo-lg p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight font-display">New Practice Task</h2>
                <button onClick={() => setShowTaskModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Target Section</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['vocabulary', 'everyday', 'academic'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setTaskCategory(cat);
                          if (cat === 'vocabulary') setTaskType('reading-part1');
                        }}
                        className={`py-3 rounded-xl border-2 border-black font-black uppercase tracking-widest text-[10px] transition-all ${taskCategory === cat ? 'bg-brand-yellow text-black shadow-neo' : 'bg-white hover:bg-gray-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Title / Group Name</label>
                  <input 
                    type="text" 
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-black p-4 rounded-xl font-bold shadow-neo-sm focus:ring-0 focus:border-brand-blue outline-none"
                    placeholder={taskCategory === 'vocabulary' ? "e.g. Science & Tech Set" : "e.g. Maintenance Notification"}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Image URL (Optional)</label>
                  <input 
                    type="text" 
                    value={taskImageUrl}
                    onChange={(e) => setTaskImageUrl(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-black p-4 rounded-xl font-bold shadow-neo-sm focus:ring-0 focus:border-brand-blue outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Input Mode</label>
                  <div className="flex bg-gray-100 p-1 rounded-xl border-2 border-black">
                    <button onClick={() => setIsBulkMode(false)} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${!isBulkMode ? 'bg-white shadow-sm' : 'text-gray-400'}`}>Manual</button>
                    <button onClick={() => setIsBulkMode(true)} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isBulkMode ? 'bg-white shadow-sm' : 'text-gray-400'}`}>Bulk Text</button>
                  </div>
                </div>

                {isBulkMode ? (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Bulk Text (Format: Passage --- Questions)</label>
                    <textarea 
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      rows={10}
                      className="w-full bg-gray-50 border-2 border-black p-4 rounded-xl font-mono text-xs shadow-neo-sm outline-none"
                      placeholder={`Passage content goes here...\n---\n1. What is the main idea?\nA) Option A\nB) Option B\nC) Option C\nD) Option D\nAnswer: B`}
                    />
                    <p className="text-[10px] text-gray-400 mt-2 font-bold italic">Separator: --- (three dashes)</p>
                  </div>
                ) : (
                  <>
                    {taskCategory !== 'vocabulary' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Content Type</label>
                          <select 
                            value={taskType}
                            onChange={(e) => setTaskType(e.target.value)}
                            className="w-full bg-white border-2 border-black p-3 rounded-xl font-bold text-xs"
                          >
                            {taskCategory === 'academic' ? (
                              <option value="article">Academic Article</option>
                            ) : (
                              <>
                                <option value="visual">Poster / Sign / Notice</option>
                                <option value="menu">Menu / Price List</option>
                                <option value="social">Social Media / Web Page</option>
                                <option value="schedule">Schedule / Agenda</option>
                                <option value="email">Email</option>
                                <option value="chat">Chat / Text Messages</option>
                                <option value="advertisement">Advertisement</option>
                                <option value="news">News Article</option>
                                <option value="form">Form / Document</option>
                                <option value="invoice">Invoice / Receipt</option>
                              </>
                            )}
                          </select>
                        </div>
                        <div className="flex flex-col justify-end">
                          <p className="text-[9px] text-gray-400 font-bold leading-tight italic">Select the best fit for content layout.</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        {taskCategory === 'vocabulary' ? 'Vocabulary Text (Use {letters} for missing letters)' : 'Content Body'}
                      </label>
                      <textarea 
                        value={taskBody}
                        onChange={(e) => setTaskBody(e.target.value)}
                        rows={6}
                        className="w-full bg-gray-50 border-2 border-black p-4 rounded-xl font-medium shadow-neo-sm focus:ring-0 focus:border-brand-blue outline-none"
                        placeholder={taskCategory === 'vocabulary' ? "Enter paragraphs here. Use {letters} for blanks. Each paragraph should be on a new line.\n\nExample: His{tory} is the study of the past..." : "Enter the complete text for the task..."}
                      />
                      {taskBody && (
                        <div className="mt-4 p-4 bg-white border-2 border-dashed border-gray-200 rounded-xl">
                          <p className="text-[8px] font-black uppercase text-gray-300 mb-2">Live Preview</p>
                          <div className="text-gray-800 pointer-events-none">
                            {renderTextPreview(taskBody)}
                          </div>
                        </div>
                      )}
                      {taskCategory === 'vocabulary' && (
                        <div className="mt-2 space-y-1">
                          <p className="text-[10px] text-brand-blue font-bold italic">
                            Tip: Wrap the missing part of any word in curly braces. E.g., "His{'{'}tory{'}'}" will show "His" and a blank for "tory".
                          </p>
                          <p className="text-[10px] text-brand-red font-bold italic">
                            Note: Each line will be added as a separate practice item.
                          </p>
                        </div>
                      )}
                    </div>

                    {taskCategory !== 'vocabulary' && (
                      <div className="pt-4 border-t-2 border-dashed border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-black uppercase tracking-widest">Questions</h3>
                          <button 
                            onClick={() => setTaskQuestions([...taskQuestions, { question: '', options: ['', '', '', ''], answer: 0, explanation: '' }])}
                            className="text-brand-blue font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                          >
                            <Plus size={14} /> Add Question
                          </button>
                        </div>
                        
                        {taskQuestions.map((q, qIndex) => (
                          <div key={qIndex} className="bg-gray-50 p-6 rounded-2xl border-2 border-black mb-6 space-y-4">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-grow space-y-4">
                                <div>
                                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Question {qIndex + 1}</label>
                                  <input 
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => {
                                      const newQ = [...taskQuestions];
                                      newQ[qIndex].question = e.target.value;
                                      setTaskQuestions(newQ);
                                    }}
                                    className="w-full bg-white border-2 border-black p-3 rounded-lg font-bold text-sm"
                                    placeholder="Enter question..."
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex flex-col gap-1">
                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="radio"
                                          checked={q.answer === oIdx}
                                          onChange={() => {
                                            const newQ = [...taskQuestions];
                                            newQ[qIndex].answer = oIdx;
                                            setTaskQuestions(newQ);
                                          }}
                                          name={`correct-${qIndex}`}
                                          className="accent-brand-blue w-4 h-4"
                                        />
                                        <span className="text-[10px] font-black uppercase text-gray-400">{String.fromCharCode(65 + oIdx)}</span>
                                      </div>
                                      <input 
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const newQ = [...taskQuestions];
                                          newQ[qIndex].options[oIdx] = e.target.value;
                                          setTaskQuestions(newQ);
                                        }}
                                        className="w-full bg-white border-2 border-black p-2 rounded-lg font-bold text-xs"
                                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                                      />
                                    </div>
                                  ))}
                                </div>
  
                                <div>
                                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Explanation (Optional)</label>
                                  <textarea 
                                    value={q.explanation}
                                    onChange={(e) => {
                                      const newQ = [...taskQuestions];
                                      newQ[qIndex].explanation = e.target.value;
                                      setTaskQuestions(newQ);
                                    }}
                                    className="w-full bg-white border-2 border-black p-3 rounded-lg font-bold text-xs"
                                    rows={2}
                                    placeholder="Explain why the answer is correct..."
                                  />
                                </div>
                              </div>
                              
                              <button 
                                onClick={() => setTaskQuestions(taskQuestions.filter((_, i) => i !== qIndex))}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <button 
                onClick={handleAddTask}
                className="w-full mt-10 bg-brand-yellow text-black py-5 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
              >
                Preview Task
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && previewTask && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl rounded-3xl border-neo-lg shadow-neo-lg overflow-y-auto max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b-4 border-black bg-brand-yellow/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight font-display">Task Preview</h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verify before publishing</p>
                </div>
                <div className="bg-brand-blue text-white px-4 py-1 rounded-full border-neo text-[10px] font-black uppercase tracking-widest">
                  {previewTask.category} • {previewTask.type}
                </div>
              </div>

              <div className="p-6 sm:p-10 flex-grow">
                <div className="space-y-6">
                  {previewTask.imageUrl && (
                    <div className="space-y-2">
                       <img src={previewTask.imageUrl} alt="preview" className="w-full rounded-2xl border-neo shadow-neo-sm aspect-video object-cover" referrerPolicy="no-referrer" />
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">* Ensure Drive link is shared as "Anyone with the link"</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 border-neo p-6 rounded-2xl shadow-inner overflow-hidden min-h-[100px]">
                    <h3 className="text-2xl font-black uppercase tracking-tight font-display mb-4 border-b-2 border-brand-blue/10 pb-2">{previewTask.title}</h3>
                    
                    {previewTask.content && (
                      <div className="text-sm font-medium text-gray-700 leading-relaxed pr-4">
                        {Array.isArray(previewTask.content) ? (
                          renderTextPreview(previewTask.content)
                        ) : typeof previewTask.content === 'string' ? (
                          renderTextPreview(previewTask.content)
                        ) : (
                          renderTextPreview(previewTask.content.body || previewTask.content.header || previewTask.content.items || "")
                        )}
                        {previewTask.category !== 'vocabulary' && !previewTask.content.body && !previewTask.content.header && !Array.isArray(previewTask.content) && typeof previewTask.content !== 'string' && previewTask.imageUrl && (
                          <div className="text-center py-6">
                            <Eye size={24} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-[10px] font-black uppercase text-gray-400">Visual-only Task Content</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {previewTask.category !== 'vocabulary' && previewTask.questions && previewTask.questions.length > 0 && (
                    <div className="space-y-4 pt-6 border-t-2 border-dashed border-gray-200">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Questions ({previewTask.questions.length})</h4>
                      {previewTask.questions.map((q: any, i: number) => (
                        <div key={i} className="bg-white border-2 border-gray-200 p-4 rounded-xl shadow-neo-sm">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <p className="font-bold text-sm">{i+1}. {q.question}</p>
                            <span className="shrink-0 bg-brand-blue text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                              Option {String.fromCharCode(65 + q.answer)} is correct
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt: string, oi: number) => (
                              <div key={oi} className={`text-[10px] p-2 rounded-lg border-2 flex items-center gap-2 ${q.answer === oi ? 'bg-green-50 border-green-500 font-black text-green-700' : 'border-gray-100 text-gray-400'}`}>
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${q.answer === oi ? 'bg-green-500 border-green-600 text-white' : 'border-gray-200'}`}>
                                  {q.answer === oi ? <Check size={8} strokeWidth={4} /> : String.fromCharCode(65+oi)}
                                </span>
                                {opt}
                              </div>
                            ))}
                          </div>
                          {q.explanation && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 text-[10px] font-medium text-gray-500 italic">
                              <span className="font-black uppercase text-[8px] block mb-1">Explanation:</span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t-4 border-black bg-gray-50 flex gap-4">
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 bg-white py-4 rounded-xl border-neo shadow-neo font-black uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={publishTask}
                  disabled={isPublishing}
                  className="flex-[2] bg-brand-red text-white py-4 rounded-xl border-neo shadow-neo font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isPublishing ? 'Publishing...' : 'Accept & Publish'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-10 rounded-3xl border-neo-lg shadow-neo-lg">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 font-bold text-sm sm:text-base">Manage users, credits, and interactive content.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-brand-yellow px-6 py-2 rounded-xl border-neo shadow-neo-sm font-black uppercase text-[10px] sm:text-xs tracking-widest flex items-center gap-2">
            <Layout size={16} /> Admin Mode
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {/* Credit Requests Area */}
        <section className="bg-white rounded-3xl border-neo-lg shadow-neo-lg overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 border-b-4 border-black bg-brand-blue/10 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display flex items-center gap-3">
              <Send size={24} /> Requests
            </h2>
            <span className="bg-white px-3 sm:px-4 py-1 rounded-full border-neo text-[10px] sm:text-sm font-black">{requests.length} Pending</span>
          </div>
          <div className="p-4 sm:p-6 space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto bg-gray-50 flex-grow">
            {requests.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-white border-neo-dashed rounded-2xl">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">No pending requests</p>
              </div>
            ) : (
              requests.map((req) => (
                <motion.div 
                  layout
                  key={req.id}
                  className="bg-white border-neo p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-neo-sm"
                >
                  <div className="flex-grow min-w-0 text-center sm:text-left">
                    <p className="font-black truncate text-sm sm:text-base">{req.userEmail}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                      <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                        {req.packageName || 'Credit Request'}: {req.amount || 50} pts
                      </p>
                      {req.price && (
                        <p className="text-[10px] font-black text-brand-red bg-red-50 px-2 py-0.5 rounded-full border border-brand-red/20 uppercase tracking-widest">
                          {req.price}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                    <button 
                      onClick={() => handleApprove(req)}
                      className="bg-green-500 text-white p-3 rounded-xl border-neo shadow-neo-sm hover:scale-105 transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex-grow sm:flex-grow-0 flex justify-center"
                    >
                      <Check size={20} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="bg-red-500 text-white p-3 rounded-xl border-neo shadow-neo-sm hover:scale-105 transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex-grow sm:flex-grow-0 flex justify-center"
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Redeem Keys Area */}
        <section className="bg-white rounded-3xl border-neo-lg shadow-neo-lg overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 border-b-4 border-black bg-brand-yellow/10 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display flex items-center gap-3">
              <Key size={24} /> Redeem Keys
            </h2>
          </div>
          <div className="p-6 sm:p-8 border-b-2 border-gray-100 flex flex-col sm:flex-row items-end gap-4 bg-gray-50/50">
            <div className="w-full">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Value (pts)</label>
              <input 
                type="number" 
                value={isNaN(newKeyValue) ? '' : newKeyValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setNewKeyValue(val);
                }}
                className="w-full bg-white border-neo rounded-xl p-3 font-black text-lg sm:text-xl shadow-inner focus:outline-none"
              />
            </div>
            <button 
              onClick={generateKey}
              disabled={isGenerating}
              className="w-full sm:w-auto h-[52px] bg-brand-yellow px-8 rounded-xl border-neo shadow-neo font-black uppercase tracking-widest hover:scale-105 transition-transform active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2"
            >
              <Plus size={20} strokeWidth={3} /> Generate
            </button>
          </div>
          <div className="p-4 sm:p-6 space-y-4 max-h-[400px] sm:max-h-[460px] overflow-y-auto bg-gray-50 flex-grow">
            {keys.map((key) => (
              <div 
                key={key.id}
                className={`bg-white border-neo p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-neo-sm ${key.used ? 'opacity-50 grayscale' : ''}`}
              >
                <div className="text-center sm:text-left">
                  <p className="font-mono font-black text-lg sm:text-xl tracking-wider select-all">{key.key}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Value: {key.value} pts • {key.used ? `Used by ${key.usedBy?.substring(0, 5)}...` : 'Active'}</p>
                </div>
                {key.used && <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg border-2 border-gray-200 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rotate-12 sm:static">Redeemed</div>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-3xl border-neo-lg shadow-neo-lg overflow-hidden">
        <div className="p-6 sm:p-8 border-b-4 border-black bg-brand-red/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display flex items-center gap-3">
            <Database size={24} /> Practice Tasks
          </h2>
          <button 
            onClick={() => {
              resetForm();
              setShowTaskModal(true);
            }}
            className="w-full sm:w-auto bg-white px-5 py-2 rounded-xl border-neo shadow-neo font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <Plus size={18} strokeWidth={3}/> Add Manually
          </button>
        </div>
        <div className="p-4 sm:p-6 space-y-8 bg-gray-50 flex-grow">
          {customTasks.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white border-neo-dashed rounded-2xl">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">No tasks published yet</p>
            </div>
          ) : (
            <div className="space-y-10">
              {(['vocabulary', 'everyday', 'academic'] as const).map(category => {
                const tasksInCategory = customTasks.filter(t => t.category === category);
                if (tasksInCategory.length === 0) return null;

                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                       <div className={`w-3 h-3 rounded-full border-2 border-black shadow-neo-sm ${
                         category === 'everyday' ? 'bg-brand-blue' : 
                         category === 'academic' ? 'bg-brand-red' : 'bg-brand-yellow'
                       }`} />
                       <h3 className="font-black uppercase tracking-widest text-xs text-gray-500">{category} ({tasksInCategory.length})</h3>
                    </div>
                    <div className="space-y-4">
                      {tasksInCategory.map((task) => (
                        <div key={task.id} className="bg-white border-neo p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-neo-sm relative overflow-hidden group">
                          {task.deleted && <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10"><span className="bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase border-neo shadow-neo">Deleted</span></div>}
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {task.type} • {task.questions?.length || (task.category === 'vocabulary' ? (Array.isArray(task.content) ? task.content.length : 1) : 0)} {task.category === 'vocabulary' ? 'Items' : 'Qs'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {task.imageUrl && (
                                <div className="w-10 h-10 rounded-lg border-2 border-black overflow-hidden flex-shrink-0 shadow-neo-sm bg-gray-100">
                                  <img src={task.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="preview" />
                                </div>
                              )}
                              <h4 className="font-black truncate block text-sm sm:text-base">{task.title}</h4>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-[9px] text-gray-300 font-medium">Created: {task.createdAt?.toDate().toLocaleDateString()}</p>
                              {task.source === 'custom' && <span className="text-[8px] bg-black text-white px-1.5 py-0.5 rounded font-black uppercase">Admin Added</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleEditTask(task)}
                              title="Edit Task"
                              className="p-3 bg-white border-neo shadow-neo-sm hover:scale-105 transition-all text-brand-blue active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => {
                                setPreviewTask(task);
                                setShowPreviewModal(true);
                              }}
                              title="View Preview Window"
                              className="p-3 bg-white border-neo shadow-neo-sm hover:scale-105 transition-all text-gray-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                              <Eye size={18} />
                            </button>
                            {onPreviewTask && (
                              <button 
                                onClick={() => onPreviewTask(task)}
                                title="Preview in Student View"
                                className="p-3 bg-brand-yellow text-black border-neo shadow-neo-sm hover:scale-105 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                              >
                                <BookOpen size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setTaskIdToDelete(task.id);
                                setShowDeleteConfirm(true);
                              }}
                              title="Delete Task"
                              className="p-3 bg-red-50 text-red-500 border-neo border-red-200 shadow-neo-sm hover:scale-105 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="p-8 sm:p-12 text-center text-gray-400 font-bold border-t-2 border-gray-50 text-sm sm:text-base bg-white">
          <p>Custom tasks will appear in the practice sections for users.</p>
        </div>

        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-neo-lg shadow-neo-lg rounded-3xl p-8 max-w-sm w-full text-center"
              >
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-100 shadow-neo-sm">
                  <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Delete Task?</h3>
                <p className="text-gray-500 text-sm font-bold mb-8">This action cannot be undone. Are you sure you want to permanently remove this task?</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setTaskIdToDelete(null);
                    }}
                    className="flex-1 py-3 border-neo bg-white font-black uppercase tracking-widest text-xs hover:bg-gray-50 active:translate-y-[1px]"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeleteTask}
                    disabled={isDeleting}
                    className="flex-1 py-3 bg-red-500 text-white border-neo-lg shadow-neo font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Now'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
