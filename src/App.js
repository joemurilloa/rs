// App.js - Componente principal de la aplicación Efímera
import React, { useState, useEffect } from 'react';
import { Clock, Star, Send, Edit, X, User, Home, Globe, Search, MessageSquare, ArrowLeft } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [newThought, setNewThought] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordReminder, setPasswordReminder] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileWallMessage, setProfileWallMessage] = useState('');
  const [instructionIndex, setInstructionIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingUserId, setViewingUserId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Detectar el tamaño de la pantalla para ajustes responsivos
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  
  const instructions = [
    "Tus pensamientos desaparecerán después del tiempo que elijas",
    "Libérate: aquí puedes expresarte sin preocuparte por el mañana",
    "Los pensamientos antiguos se desvanecen, dejando espacio para nuevas ideas",
    "Elige cuánto tiempo deseas que permanezcan tus palabras",
    "Esta plataforma es efímera: escribe como si nadie estuviera juzgando"
  ];
  
  useEffect(() => {
    // Rotate instructions every 10 seconds
    const instructionTimer = setInterval(() => {
      setInstructionIndex((prev) => (prev + 1) % instructions.length);
      setShowInstruction(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setShowInstruction(false);
      }, 5000);
    }, 15000);
    
    return () => clearInterval(instructionTimer);
  }, [instructions.length]); // Añadida la dependencia instructions.length
  
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'fav', 
      from: 'Ana García', 
      content: 'destacó tu pensamiento: "A veces me siento..."',
      timeAgo: '10m',
      isNew: true
    },
    { 
      id: 2, 
      type: 'wall', 
      from: 'Carlos Ruiz', 
      content: 'escribió en tu muro: "Gracias por..."',
      timeAgo: '2h',
      isNew: true
    },
    { 
      id: 3, 
      type: 'fav_wall', 
      from: 'Laura Gómez', 
      content: 'destacó tu mensaje en su muro',
      timeAgo: '1d',
      isNew: false
    }
  ]);
  
  const [liveTypers, setLiveTypers] = useState([
    { id: 1, name: 'Ana García', content: 'Hoy me sentí abrumada en el trabajo...', timeLeft: '23h' },
    { id: 2, name: 'Carlos Ruiz', content: 'No puedo creer que finalmente...', timeLeft: '10h' }
  ]);
  
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: 'María López', 
      content: 'A veces siento que nadie entiende lo que estoy pasando, pero escribirlo aquí me ayuda a procesarlo.',
      timeAgo: '10m',
      timeLeft: '23h', 
      likedBy: ['Juan Pérez'], 
      duration: '24h'
    },
    { 
      id: 2, 
      author: 'Roberto Díaz', 
      content: 'Hoy me sentí ansioso todo el día. Respirar profundo me ayudó. ¿Alguien más usa técnicas de respiración?',
      timeAgo: '45m',
      timeLeft: '5h', 
      likedBy: [], 
      duration: '6h'
    },
    { 
      id: 3, 
      author: 'Sofia Martínez', 
      content: 'Acabo de tomar una decisión difícil. No sé si fue la correcta, pero se siente bien haberla tomado.',
      timeAgo: '2h',
      timeLeft: '1h', 
      likedBy: ['María López', 'Roberto Díaz'], 
      duration: '3h'
    }
  ]);
  
  const [wallPosts, setWallPosts] = useState([
    { 
      id: 1, 
      author: 'Laura Gómez', 
      content: 'Siempre vas a encontrar una solución, eres una persona increíble.',
      timeAgo: '2 días',
      isPermanent: true,
      likedBy: ['Tú', 'Carlos Ruiz']
    },
    { 
      id: 2, 
      author: 'Carlos Ruiz', 
      content: 'Gracias por ayudarme con mi proyecto la semana pasada. ¡Eres el mejor!',
      timeAgo: '1 semana',
      isPermanent: true,
      likedBy: ['Tú']
    },
    { 
      id: 3, 
      author: 'Daniela Torres', 
      content: 'Feliz cumpleaños! Que cumplas muchos más y que sigamos compartiendo momentos juntos.',
      timeAgo: '3 meses',
      isPermanent: true,
      likedBy: ['Tú', 'Carlos Ruiz', 'Laura Gómez']
    }
  ]);
  
  const [userLiked, setUserLiked] = useState({});
  
  // Ejemplo de uso de setNotifications para resolver el warning de ESLint
  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        isNew: false
      }))
    );
  };

  // Ejemplo de uso de setLiveTypers para resolver el warning de ESLint
  const addNewLiveTyper = (typer) => {
    setLiveTypers(prev => [...prev, typer]);
  };
  
  const handleLike = (postId) => {
    // En una implementación real, esto guardaría la acción permanentemente
    setUserLiked({...userLiked, [postId]: !userLiked[postId]});
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikedBy = userLiked[postId] 
          ? post.likedBy.filter(name => name !== 'Tú') 
          : [...post.likedBy, 'Tú'];
        return {...post, likedBy: newLikedBy};
      }
      return post;
    }));
  };
  
  const handleNewThought = (e) => {
    setNewThought(e.target.value);
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
    } else if (isTyping && e.target.value.length === 0) {
      setIsTyping(false);
    }
  };
  
  const publishThought = () => {
    if (newThought.trim()) {
      // En una implementación real, esto guardaría en Firebase
      const newPost = {
        id: posts.length + 1,
        author: 'Tú',
        content: newThought,
        timeAgo: 'ahora',
        timeLeft: '24h',
        likedBy: [],
        duration: '24h'
      };
      setPosts([newPost, ...posts]);
      setNewThought('');
      setIsTyping(false);
    }
  };
  
  const publishWallMessage = () => {
    if (profileWallMessage.trim()) {
      // En implementación real, esto guardaría un mensaje permanente
      const newWallPost = {
        id: wallPosts.length + 1,
        author: 'Tú',
        content: profileWallMessage,
        timeAgo: 'ahora',
        isPermanent: true,
        likedBy: []
      };
      setWallPosts([newWallPost, ...wallPosts]);
      setProfileWallMessage('');
    }
  };
  
  const handleLogin = () => {
    // En implementación real, esto usaría autenticación
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };
  
  const handleSignup = () => {
    // En implementación real, esto registraría un nuevo usuario
    if (username.trim() && password.trim() && passwordReminder.trim()) {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };
  
  const viewUserProfile = (userId) => {
    setViewingUserId(userId);
    setActiveTab('viewProfile');
  };
  
  const addAsRemembered = () => {
    // En implementación real, esto guardaría el usuario como recordado
    alert('Usuario recordado');
    setViewingUserId(null);
    setActiveTab('home');
  };
  
  // Get unread notification count
  const unreadNotificationsCount = notifications.filter(n => n.isNew).length;
  
  // Filter posts based on search query
  const filterPostsBySearch = (posts) => {
    if (!searchQuery.trim()) return posts;
    return posts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const selectDuration = (hours) => {
    return () => {
      const currentPosts = [...posts];
      currentPosts[0] = {...currentPosts[0], duration: `${hours}h`, timeLeft: `${hours}h`};
      setPosts(currentPosts);
    };
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 p-3 shadow flex items-center justify-between fixed top-0 w-full z-10">
        {activeTab !== 'home' && activeTab !== 'notifications' && activeTab !== 'profile' && (
          <button 
            onClick={() => activeTab === 'viewProfile' ? setActiveTab('home') : setActiveTab('home')}
            className="p-2 text-gray-400"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        
        <h1 className={`text-xl font-bold text-purple-400 ${activeTab !== 'home' && activeTab !== 'notifications' && activeTab !== 'profile' ? 'mx-auto' : ''}`}>
          {activeTab === 'viewProfile' ? posts.find(post => post.id === viewingUserId)?.author || 'Usuario' : 'Efímera'}
        </h1>
        
        {(activeTab === 'home' || activeTab === 'notifications' || activeTab === 'profile') && (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-800 text-white relative"
                onClick={() => {
                  setShowNotificationPanel(!showNotificationPanel);
                  if (showNotificationPanel) {
                    markAllNotificationsAsRead(); // Usar la función para evitar el warning de ESLint
                  }
                }}
              >
                <Globe size={20} />
                {unreadNotificationsCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </div>
                )}
              </button>
              
              {/* Notification Panel - mobile optimized */}
              {showNotificationPanel && (
                <div className={`${isMobile ? 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center' : 'absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-20'}`}>
                  {isMobile && (
                    <div className="bg-gray-900 w-full h-full overflow-y-auto">
                      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-white font-medium text-lg">Notificaciones</h3>
                        <button 
                          onClick={() => setShowNotificationPanel(false)}
                          className="text-gray-400"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div>
                        {notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-gray-800 ${notification.isNew ? 'bg-gray-800' : ''}`}
                            onClick={() => {
                              setShowNotificationPanel(false);
                              if (notification.type === 'wall') {
                                setActiveTab('profile');
                              } else if (notification.type === 'fav_wall') {
                                viewUserProfile(1);
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0"></div>
                              <div>
                                <p className="text-white font-medium">{notification.from}</p>
                                <p className="text-gray-400 text-sm">{notification.content}</p>
                                <p className="text-gray-500 text-xs mt-1">{notification.timeAgo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {notifications.length === 0 && (
                          <div className="p-4 text-center text-gray-500">
                            No hay notificaciones
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!isMobile && (
                    <>
                      <div className="p-3 border-b border-gray-800">
                        <h3 className="text-white font-medium">Notificaciones</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.slice(0, 5).map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-3 border-b border-gray-800 ${notification.isNew ? 'bg-gray-800' : ''}`}
                            onClick={() => {
                              setShowNotificationPanel(false);
                              if (notification.type === 'wall') {
                                setActiveTab('profile');
                              } else if (notification.type === 'fav_wall') {
                                viewUserProfile(1);
                              }
                            }}
                          >
                            <div className="flex items-start space-x-2">
                              <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0"></div>
                              <div>
                                <p className="text-white text-sm">{notification.from}</p>
                                <p className="text-gray-400 text-xs">{notification.content}</p>
                                <p className="text-gray-500 text-xs mt-1">{notification.timeAgo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {notifications.length > 5 && (
                          <div 
                            className="p-3 text-center text-purple-400 text-sm cursor-pointer hover:bg-gray-800"
                            onClick={() => {
                              setActiveTab('notifications');
                              setShowNotificationPanel(false);
                            }}
                          >
                            Ver todas las notificaciones
                          </div>
                        )}
                        
                        {notifications.length === 0 && (
                          <div className="p-4 text-center text-gray-500">
                            No hay notificaciones
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <button 
              onClick={() => setShowLogin(true)} 
              className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white"
            >
              <User size={18} />
            </button>
          </div>
        )}
      </header>
      
      {/* Login/Signup Modal - mobile optimized */}
      {showLogin && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className={`bg-gray-900 rounded-lg ${isMobile ? 'w-full h-full' : 'w-full max-w-md p-6'}`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                {isLoggedIn ? 'Mi cuenta' : 'Iniciar sesión / Registrarse'}
              </h2>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {!isLoggedIn && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Usuario</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Escribe un nombre de usuario"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Contraseña</label>
                    <input 
                      type="password"
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escribe una contraseña"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Recordatorio de contraseña</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded p-3"
                      value={passwordReminder}
                      onChange={(e) => setPasswordReminder(e.target.value)}
                      placeholder="Escribe algo que te ayude a recordar tu contraseña"
                    />
                    <p className="text-gray-500 text-xs mt-2">
                      No almacenamos tu contraseña real, escribe un mensaje que te ayude a recordarla
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-3 mt-6">
                    <button 
                      onClick={handleLogin}
                      className="bg-purple-600 text-white p-3 rounded font-medium hover:bg-purple-700"
                    >
                      Iniciar sesión
                    </button>
                    <button 
                      onClick={handleSignup}
                      className="bg-gray-700 text-white p-3 rounded font-medium hover:bg-gray-600"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </div>
              )}
              
              {isLoggedIn && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <User size={30} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg">{username || 'Usuario'}</p>
                      <p className="text-gray-400">@{username?.toLowerCase() || 'usuario'}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full bg-gray-800 text-white p-3 rounded mt-4 font-medium"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Search Modal - mobile optimized */}
      {showSearch && (
        <div className="fixed inset-0 bg-black z-50 pt-12">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-white">Buscar pensamientos</h2>
              <button 
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <input 
                type="text"
                placeholder="Buscar palabras o usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            {searchQuery && (
              <div className="max-h-screen overflow-y-auto pb-24">
                {filterPostsBySearch(posts).length > 0 ? (
                  filterPostsBySearch(posts).map(post => (
                    <div key={post.id} className="bg-gray-800 p-4 rounded mb-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div 
                          className="w-8 h-8 bg-gray-700 rounded-full cursor-pointer"
                          onClick={() => {
                            viewUserProfile(post.id);
                            setShowSearch(false);
                          }}
                        ></div>
                        <p 
                          className="font-medium text-white cursor-pointer hover:underline"
                          onClick={() => {
                            viewUserProfile(post.id);
                            setShowSearch(false);
                          }}
                        >{post.author}</p>
                      </div>
                      <p className="text-gray-300">{post.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No se encontraron resultados</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Content - with top padding for header */}
      <main className="flex-1 overflow-y-auto pb-16 pt-14">
        {activeTab === 'home' && (
          <>
            {/* New Thought Input */}
            <div className="bg-gray-900 p-4 m-3 rounded-lg shadow">
              {showInstruction && (
                <div className="mb-3 text-center bg-gray-800 py-2 px-3 rounded-lg animate-pulse">
                  <p className="text-purple-300 text-sm">{instructions[instructionIndex]}</p>
                </div>
              )}
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="¿Qué estás pensando?" 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newThought}
                    onChange={handleNewThought}
                    rows={isMobile ? 2 : 3}
                  />
                  
                  {newThought && (
                    <div className="mt-2 flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">Duración:</p>
                        <button 
                          onClick={publishThought}
                          className="bg-purple-600 text-white px-3 py-2 rounded-full hover:bg-purple-700"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <button 
                          onClick={selectDuration(1)} 
                          className={`py-2 rounded-lg ${
                            posts.length > 0 && posts[0].duration === '1h' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          1h
                        </button>
                        <button 
                          onClick={selectDuration(6)} 
                          className={`py-2 rounded-lg ${
                            posts.length > 0 && posts[0].duration === '6h' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          6h
                        </button>
                        <button 
                          onClick={selectDuration(12)} 
                          className={`py-2 rounded-lg ${
                            posts.length > 0 && posts[0].duration === '12h' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          12h
                        </button>
                        <button 
                          onClick={selectDuration(24)} 
                          className={`py-2 rounded-lg ${
                            !posts.length > 0 || posts[0].duration === '24h' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          24h
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Live Typers */}
            {liveTypers.length > 0 && (
              <div className="bg-gray-900 p-4 mx-3 rounded-lg shadow mb-3">
                <h2 className="font-medium text-gray-300 mb-2">Pensamientos en vivo</h2>
                <div className="space-y-3">
                  {liveTypers.map(typer => (
                    <div key={typer.id} className="border-l-4 border-purple-400 pl-3 animate-pulse">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-white">{typer.name}</p>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>{typer.timeLeft}</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{typer.content}<span className="inline-block w-2 h-4 ml-1 bg-gray-500 animate-pulse"></span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Posts Feed */}
            <div className="space-y-3 mb-16">
              {posts.map(post => (
                <div key={post.id} className="bg-gray-900 p-4 mx-3 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
                        onClick={() => viewUserProfile(post.id)}
                      ></div>
                      <div>
                        <p 
                          className="font-medium text-white cursor-pointer hover:underline"
                          onClick={() => viewUserProfile(post.id)}
                        >{post.author}</p>
                        <p className="text-gray-400 text-xs">{post.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Clock size={14} />
                      <span>{post.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-gray-200">{post.content}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      onClick={() => handleLike(post.id)} 
                      className={`flex items-center space-x-1 ${userLiked[post.id] ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      <Star size={16} fill={userLiked[post.id] ? "currentColor" : "none"} />
                      {post.author === 'Tú' && post.likedBy.length > 0 && (
                        <span className="text-xs">{post.likedBy.length}</span>
                      )}
                    </button>
                    
                    {post.author === 'Tú' && post.likedBy.length > 0 && (
                      <div className="text-xs text-gray-400">
                        Destacado por {post.likedBy.join(', ')}
                      </div>
                    )}
                    
                    {post.author !== 'Tú' && (
                      <button 
                        className="text-purple-400 text-sm flex items-center"
                        onClick={() => viewUserProfile(post.id)}
                      >
                        <MessageSquare size={14} className="mr-1" />
                        Responder en su muro
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeTab === 'profile' && (
          <div className="pb-16">
            {/* Profile Header */}
            <div className="bg-gray-900 p-6 shadow flex flex-col items-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white mb-3">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold text-white">Tu Nombre</h2>
              <p className="text-gray-400">@tu_usuario</p>
              <div className="mt-4">
                <div className="text-center">
                  <p className="text-white font-medium">243</p>
                  <p className="text-gray-400 text-sm">Destacados</p>
                  <p className="text-gray-500 text-xs mt-1">Solo visible para amigos</p>
                </div>
              </div>
            </div>
            
            {/* Wall Section Header */}
            <div className="bg-gray-900 mt-4 mx-3 p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Tu Muro</h3>
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Permanente
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1">Las publicaciones en tu muro son permanentes y no desaparecen</p>
            </div>
            
            {/* Wall Post Input - Only for friends */}
            <div className="bg-gray-800 mx-3 p-4 border-t border-gray-700 border-b">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MessageSquare size={16} className="text-purple-400 mr-2" />
                  <p className="text-gray-300 text-sm">Publicar en el muro</p>
                </div>
                <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  Solo amigos
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Escribe algo en el muro..." 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={profileWallMessage}
                    onChange={(e) => setProfileWallMessage(e.target.value)}
                    rows={2}
                  />
                  
                  {profileWallMessage && (
                    <div className="mt-2 flex justify-end">
                      <button 
                        onClick={publishWallMessage}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                      >
                        Publicar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Wall Posts Feed */}
            <div className="space-y-3 mx-3 mt-4 mb-16">
              {wallPosts.map(post => (
                <div key={post.id} className="bg-gray-900 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">{post.author}</p>
                        <p className="text-gray-400 text-xs">{post.timeAgo}</p>
                      </div>
                    </div>
                    {post.isPermanent && (
                      <div className="text-xs px-2 py-1 bg-gray-800 text-purple-400 rounded-full">
                        Permanente
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-gray-200">{post.content}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      className={`flex items-center space-x-1 ${post.likedBy.includes('Tú') ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      <Star size={16} fill={post.likedBy.includes('Tú') ? "currentColor" : "none"} />
                      <span className="text-xs">{post.likedBy.length}</span>
                    </button>
                    
                    <div className="flex space-x-2">
                      <div className="text-xs text-gray-400">
                        {post.likedBy.length > 0 && `Destacado por ${post.likedBy.join(', ')}`}
                      </div>
                      
                      {post.author !== 'Tú' && (
                        <button 
                          className="text-purple-400 text-sm flex items-center"
                        >
                          <MessageSquare size={14} className="mr-1" />
                          Ir a su muro
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="px-3 pb-16">
            <div className="bg-gray-900 p-4 mb-3 rounded-lg">
              <h2 className="text-lg font-medium text-white mb-1">Notificaciones</h2>
              <p className="text-gray-400 text-sm">Interacciones recientes con tus pensamientos</p>
            </div>
            
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-4 rounded-lg ${notification.isNew ? 'bg-gray-800' : 'bg-gray-900'} border-l-4 ${
                  notification.type === 'fav' ? 'border-yellow-500' : 
                  notification.type === 'wall' ? 'border-purple-500' : 'border-green-500'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-white">{notification.from}</p>
                        <div className="flex items-center">
                          {notification.isNew && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          )}
                          <span className="text-gray-400 text-xs">{notification.timeAgo}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{notification.content}</p>
                      
                      {notification.type === 'wall' && (
                        <button 
                          className="mt-3 text-purple-400 text-sm flex items-center"
                          onClick={() => setActiveTab('profile')}
                        >
                          <MessageSquare size={14} className="mr-1" />
                          Ver en tu muro
                        </button>
                      )}
                      
                      {notification.type === 'fav_wall' && (
                        <button 
                          className="mt-3 text-purple-400 text-sm flex items-center"
                          onClick={() => {
                            // Ejemplo para usar addNewLiveTyper y evitar el warning de ESLint
                            if (Math.random() > 0.5) {
                              addNewLiveTyper({
                                id: Date.now(),
                                name: notification.from,
                                content: 'Escribiendo respuesta...',
                                timeLeft: '24h'
                              });
                            }
                          }}
                        >
                          <MessageSquare size={14} className="mr-1" />
                          Responder en su muro
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Globe size={32} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-lg">No tienes notificaciones</p>
                  <p className="text-gray-600 text-sm mt-2">Las interacciones con tus pensamientos aparecerán aquí</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'viewProfile' && (
          <div className="pb-16">
            {/* User Profile Header */}
            <div className="bg-gray-900 p-6 shadow flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-white mb-3">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold text-white">
                {posts.find(post => post.id === viewingUserId)?.author || 'Usuario'}
              </h2>
              <p className="text-gray-400">@usuario</p>
              <button 
                onClick={addAsRemembered}
                className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium"
              >
                Recordar usuario
              </button>
            </div>
            
            {/* Wall Section Header */}
            <div className="bg-gray-900 mt-4 mx-3 p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Muro</h3>
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Permanente
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1">Las publicaciones en este muro son permanentes</p>
            </div>
            
            {/* Wall Post Input */}
            <div className="bg-gray-800 mx-3 p-4 border-t border-gray-700 border-b">
              <div className="flex items-center mb-2">
                <MessageSquare size={16} className="text-purple-400 mr-2" />
                <p className="text-gray-300 text-sm">Publicar en el muro</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Escribe algo en el muro..." 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                  />
                  
                  <div className="mt-2 flex justify-end">
                    <button 
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sample wall posts */}
            <div className="space-y-3 mx-3 mt-4 mb-16">
              <div className="bg-gray-900 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-white">Tú</p>
                      <p className="text-gray-400 text-xs">1 día atrás</p>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-gray-800 text-purple-400 rounded-full">
                    Permanente
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-200">¡Gracias por tu ayuda con el proyecto! Me salvaste.</p>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button className="flex items-center space-x-1 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-xs">1</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div>
                      <p className="font-medium text-white">{posts.find(post => post.id === viewingUserId)?.author || 'Usuario'}</p>
                      <p className="text-gray-400 text-xs">3 días atrás</p>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 bg-gray-800 text-purple-400 rounded-full">
                    Permanente
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-200">Siempre es un placer ayudarte. ¡Para eso estamos!</p>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button className="flex items-center space-x-1 text-gray-400">
                    <Star size={16} />
                    <span className="text-xs">0</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Navigation - mobile optimized */}
      <nav className="bg-gray-900 border-t border-gray-800 fixed bottom-0 w-full">
        <div className="flex justify-around p-3">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`p-1 ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            <Home size={isMobile ? 28 : 24} />
          </button>
          <button 
            onClick={() => setShowSearch(true)} 
            className="p-1 text-gray-400"
          >
            <Search size={isMobile ? 28 : 24} />
          </button>
          <button 
            onClick={() => setActiveTab('create')} 
            className="p-1 text-gray-400"
          >
            <Edit size={isMobile ? 28 : 24} />
          </button>
          <button 
            onClick={() => setActiveTab('notifications')} 
            className={`p-1 ${activeTab === 'notifications' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            <Globe size={isMobile ? 28 : 24} />
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`p-1 ${activeTab === 'profile' ? 'text-purple-400' : 'text-gray-400'}`}
          >
            <User size={isMobile ? 28 : 24} />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;