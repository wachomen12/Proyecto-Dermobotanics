"use client";
import { useState, useEffect } from "react";
import { Lock, LogOut, Key, Package, Edit2, Trash2, Save, X, Plus, Image as LucideImage, DollarSign, Tag, Layers, User, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import ResultadosPanel from "./ResultadosPanel";
import ResultadosAdminGaleria from "./ResultadosAdminGaleria";
import { getAdminCredentials, setAdminCredentials } from "@/utils/adminConfig";

export default function AdminPanel() {
    // --- Servicios ---
    const [services, setServices] = useState<any[]>([]);
    const [service, setService] = useState({
      name: "",
      description: "",
      price: "",
      duration: "",
      image: null as File | null,
      icon: ""
    });
    const [servicePreview, setServicePreview] = useState<string | null>(null);
    const [editServiceIndex, setEditServiceIndex] = useState<number | null>(null);

    // Imagen para servicios
    const handleServiceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setService({ ...service, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setServicePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setServicePreview(null);
      }
    };

    // Guardar servicio con imagen
    const handleServiceSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      let imgSrc = servicePreview || null;
      let icon = service.icon;
      if (service.image instanceof File) {
        try {
          imgSrc = await uploadToCloudinary(service.image);
        } catch (err: any) {
          showNotification("Error al subir la imagen: " + err.message, "error");
          setLoading(false);
          return;
        }
      }
      // Guardar servicio en la API
      try {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: service.name,
            title: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
            image: imgSrc,
            icon: imgSrc ? "" : icon
          }),
        });
        if (!res.ok) throw new Error("Error al guardar servicio");
        // Recargar servicios desde la API para asegurar que se muestran todos los datos reales
        await fetch("/api/services")
          .then(res => res.json())
          .then(data => setServices(data));
        showNotification("Servicio agregado correctamente", "success");
        setService({ name: "", description: "", price: "", duration: "", image: null, icon: "" });
        setServicePreview(null);
      } catch (err: any) {
        showNotification("Error al guardar servicio: " + err.message, "error");
      }
      setLoading(false);
    };
  const [isAuth, setIsAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [adminUser, setAdminUser] = useState("admin");
  const [adminPass, setAdminPass] = useState("admin123");
  const [showChangePass, setShowChangePass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const marcas = ["Bassa", "Natú", "Amorenature", "Natural Center"];
  const categorias = ["Cuidado Facial", "Cuidado Corporal", "Cuidado Capilar", "Suplementos"];
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    marca: marcas[0],
    categoria: categorias[0],
    image: null as File | null,
  });
  const [products, setProducts] = useState<Array<{ id?: string; name: string; description: string; price: string; marca: string; categoria: string; image: string | null }>>([]);
  // Leer usuario y contraseña de Firestore al iniciar
  useEffect(() => {
    getAdminCredentials().then(({ user, pass }) => {
      setAdminUser(user);
      setAdminPass(pass);
    });
  }, []);
  // Cargar productos desde la API al iniciar
  useEffect(() => {
    if (isAuth) {
      fetch("/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(() => setProducts([]));
    }
  }, [isAuth]);

  // Cargar servicios desde la API al iniciar
  useEffect(() => {
    if (isAuth) {
      fetch("/api/services")
        .then(res => res.json())
        .then(data => {
          console.log("Servicios recibidos:", data);
          setServices(data);
        })
        .catch(() => setServices([]));
    }
  }, [isAuth]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login.user === adminUser && login.pass === adminPass) {
        setIsAuth(true);
        setError("");
        showNotification("Sesión iniciada correctamente", "success");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
      setLoading(false);
    }, 500);
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setError("");
  };


  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPass(e.target.value);
  };
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(e.target.value);
  };

  const handleSavePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return;
    }
    if (newPass.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await setAdminCredentials({ user: newUser, pass: newPass });
      setAdminUser(newUser);
      setAdminPass(newPass);
      setShowChangePass(false);
      setError("");
      setNewPass("");
      setNewUser("");
      showNotification("Usuario y contraseña actualizados correctamente", "success");
    } catch (err: any) {
      setError("Error al guardar: " + err.message);
      console.error("Error al guardar usuario/contraseña:", err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuth(false);
    setLogin({ user: "", pass: "" });
    showNotification("Sesión cerrada", "success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProduct({ ...product, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imgSrc = preview || null;
    if (product.image instanceof File) {
      try {
        imgSrc = await uploadToCloudinary(product.image);
      } catch (err: any) {
        showNotification("Error al subir la imagen: " + err.message, "error");
        setLoading(false);
        return;
      }
    }
    // Guardar producto en la API
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          marca: product.marca,
          categoria: product.categoria,
          image: imgSrc,
        }),
      });
      if (!res.ok) throw new Error("Error al guardar producto");
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      showNotification("Producto agregado correctamente", "success");
      setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null });
      setPreview(null);
    } catch (err: any) {
      showNotification("Error al guardar producto: " + err.message, "error");
    }
    setLoading(false);
  };

  const handleEdit = (index: number) => {
    const prod = products[index];
    setProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      marca: prod.marca,
      categoria: prod.categoria,
      image: null,
    });
    setPreview(prod.image);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (index: number) => {
    const prod = products[index];
    if (!prod?.id) return showNotification("No se puede eliminar: ID no encontrada", "error");
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setLoading(true);
      try {
        const res = await fetch("/api/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: prod.id })
        });
        if (!res.ok) throw new Error("Error al eliminar producto");
        // Refrescar lista desde la API
        const updated = await fetch("/api/products").then(r => r.json());
        setProducts(updated);
        showNotification("Producto eliminado", "success");
        if (editIndex === index) {
          setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null });
          setPreview(null);
          setEditIndex(null);
        }
      } catch (err: any) {
        showNotification("Error al eliminar: " + err.message, "error");
      }
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null });
    setPreview(null);
    setEditIndex(null);
  };

  // Eliminar servicio
const handleDeleteService = async (index: number) => {
  const srv = services[index];
  if (!srv?.id) return showNotification("No se puede eliminar: ID no encontrada", "error");
  if (window.confirm("¿Estás seguro de eliminar este servicio?")) {
    setLoading(true);
    try {
      const res = await fetch("/api/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: srv.id })
      });
      if (!res.ok) throw new Error("Error al eliminar servicio");
      // Refrescar lista desde la API
      const updated = await fetch("/api/services").then(r => r.json());
      setServices(updated);
      showNotification("Servicio eliminado", "success");
      if (editServiceIndex === index) {
        setService({ name: "", description: "", price: "", duration: "", image: null, icon: "" });
        setServicePreview(null);
        setEditServiceIndex(null);
      }
    } catch (err: any) {
      showNotification("Error al eliminar: " + err.message, "error");
    }
    setLoading(false);
  }
};

// Editar servicio (preparar para edición, no guardar aún)
const handleEditService = (index: number) => {
  const srv = services[index];
  setService({
    name: srv.name || srv.title || "",
    description: srv.description || "",
    price: srv.price || "",
    duration: srv.duration || "",
    image: null,
    icon: srv.icon || ""
  });
  setServicePreview(srv.image || null);
  setEditServiceIndex(index);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">Panel de Administración</h1>
            <p className="text-slate-600 text-center mb-8 text-sm">Ingresa tus credenciales para continuar</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Usuario</label>
                <input
                  type="text"
                  name="user"
                  value={login.user}
                  onChange={handleChangeLogin}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white transition-all"
                  placeholder="Ingresa tu usuario"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="pass"
                    value={login.pass}
                    onChange={handleChangeLogin}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white transition-all pr-12"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Verificando..." : "Iniciar Sesión"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-8 px-4">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg font-semibold text-white animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-1">Panel de Administrador</h1>
            <p className="text-slate-600 text-base md:text-lg">Gestiona tus productos y configuración</p>
          </div>
          <div className="flex gap-4 flex-wrap justify-start md:justify-end">
            <button
              type="button"
              onClick={() => setShowChangePass(true)}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all flex items-center gap-2 border border-slate-300 shadow-sm"
            >
              <Key className="w-5 h-5" />
              Cambiar Contraseña
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-all flex items-center gap-2 border border-red-200 shadow-sm"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Panel de servicios */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              {editServiceIndex !== null ? <Edit2 className="w-5 h-5 text-amber-600" /> : <Plus className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editServiceIndex !== null ? "Editar Servicio" : "Agregar Nuevo Servicio"}
              </h2>
              <p className="text-slate-600 text-sm">Completa la información del servicio</p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleServiceSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Nombre del Servicio</label>
                <input
                  type="text"
                  name="name"
                  value={service.name}
                  onChange={e => setService({ ...service, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                  placeholder="Ej: Masaje Relajante"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Descripción</label>
                <textarea
                  name="description"
                  value={service.description}
                  onChange={e => setService({ ...service, description: e.target.value })}
                  rows={4}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white resize-none"
                  placeholder="Describe el servicio..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={service.price}
                  onChange={e => setService({ ...service, price: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Duración</label>
                <input
                  type="text"
                  name="duration"
                  value={service.duration}
                  onChange={e => setService({ ...service, duration: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                  placeholder="Ej: 60 min"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <LucideImage className="w-4 h-4" />
                  Imagen del Servicio o Emoji
                </label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleServiceImage}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-700 file:font-medium hover:file:bg-amber-100 file:cursor-pointer cursor-pointer"
                      title="Seleccionar imagen del servicio"
                      aria-label="Seleccionar imagen del servicio"
                    />
                  </div>
                  <span className="text-slate-500 font-medium">o</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={service.icon}
                    onChange={e => setService({ ...service, icon: e.target.value })}
                    className="w-16 border border-slate-300 rounded-xl px-3 py-3 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                    placeholder="😀"
                    title="Emoji para el servicio"
                    aria-label="Emoji para el servicio"
                  />
                </div>
                {/* Previsualización */}
                {servicePreview ? (
                  <div className="mt-4 relative inline-block">
                    <Image src={servicePreview} alt="Vista previa de la imagen del servicio" width={128} height={128} className="rounded-xl shadow-md w-32 h-32 object-cover border-2 border-slate-200" />
                    <button
                      type="button"
                      onClick={() => {
                        setServicePreview(null);
                        setService({ ...service, image: null });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-md"
                      title="Eliminar vista previa"
                      aria-label="Eliminar vista previa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : service.icon ? (
                  <div className="mt-4 text-6xl select-none" title="Vista previa del emoji">{service.icon}</div>
                ) : null}
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Procesando..."
                ) : (
                  <>
                    {editServiceIndex !== null ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editServiceIndex !== null ? "Guardar Cambios" : "Agregar Servicio"}
                  </>
                )}
              </button>
              {editServiceIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setService({ name: "", description: "", price: "", duration: "", image: null, icon: "" });
                    setServicePreview(null);
                    setEditServiceIndex(null);
                  }}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Panel de resultados de clientes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <ResultadosPanel />
          <ResultadosAdminGaleria />
        </div>
        {/* Header profesional del panel admin */}

        {/* Modal/Panel de cambio de contraseña */}
        {showChangePass && (
          <div className="fixed inset-0 z-50 flex">
            {/* Fondo oscuro semitransparente */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
              onClick={() => {
                setShowChangePass(false);
                setNewPass("");
                setNewUser("");
                setError("");
              }}
            />
            {/* Sidebar */}
            <aside className="relative ml-auto w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right">
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2"><Key className="w-6 h-6" /> Cambiar usuario y contraseña</h2>
                <div className="mb-6 text-slate-600 text-sm">Para mayor seguridad, cambia ambos datos. El usuario debe ser único y la contraseña segura.</div>
                <form className="flex-1 flex flex-col gap-6" onSubmit={handleSavePass} autoComplete="off">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2"><User className="w-4 h-4"/>Usuario actual</label>
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">{adminUser}</span>
                    </div>
                    <input
                      type="text"
                      value={newUser}
                      onChange={handleChangeUser}
                      onFocus={e => { if (!newUser) setNewUser(adminUser); }}
                      onKeyPress={e => e.key === 'Enter' && handleSavePass(e)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white mt-1"
                      placeholder="Nuevo usuario (mínimo 3 caracteres)"
                      autoComplete="username"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-semibold text-slate-700">Nueva contraseña</label>
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="text-slate-500 hover:text-slate-800 p-1"
                        tabIndex={-1}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPass}
                      onChange={handleChangePass}
                      onKeyPress={e => e.key === 'Enter' && handleSavePass(e)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white mt-1"
                      placeholder="Nueva contraseña (mínimo 6 caracteres)"
                      autoComplete="new-password"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-md hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                          Guardando...
                        </>
                      ) : (
                        "Guardar"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangePass(false);
                        setNewPass("");
                        setNewUser("");
                        setError("");
                      }}
                      className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all"
                      autoFocus
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </aside>
            <style jsx global>{`
              @keyframes slide-in-right {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slide-in-right {
                animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1);
              }
            `}</style>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              {editIndex !== null ? <Edit2 className="w-5 h-5 text-amber-600" /> : <Plus className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editIndex !== null ? "Editar Producto" : "Agregar Nuevo Producto"}
              </h2>
              <p className="text-slate-600 text-sm">Completa la información del producto</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                  placeholder="Ej: Crema Hidratante Natural"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Descripción</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white resize-none"
                  placeholder="Describe las características y beneficios del producto..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Marca
                </label>
                <select
                  title="Seleccionar marca"
                  name="marca"
                  value={product.marca}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                >
                  {marcas.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Categoría
                </label>
                <select
                  title="Seleccionar categoría"
                  name="categoria"
                  value={product.categoria}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-800 bg-white"
                >
                  {categorias.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                  <LucideImage className="w-4 h-4" />
                  Imagen del Producto
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-700 file:font-medium hover:file:bg-amber-100 file:cursor-pointer cursor-pointer"
                    title="Seleccionar imagen del producto"
                    aria-label="Seleccionar imagen del producto"
                  />
                </div>
                {preview && (
                  <div className="mt-4 relative inline-block">
                    <Image src={preview} alt="Vista previa de la imagen del producto" width={128} height={128} className="rounded-xl shadow-md w-32 h-32 object-cover border-2 border-slate-200" />
                    <button
                      onClick={() => {
                        setPreview(null);
                        setProduct({ ...product, image: null });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-md"
                      title="Eliminar vista previa"
                      aria-label="Eliminar vista previa"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Procesando..."
                ) : (
                  <>
                    {editIndex !== null ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editIndex !== null ? "Guardar Cambios" : "Agregar Producto"}
                  </>
                )}
              </button>
              
              {editIndex !== null && (
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Productos Registrados */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Productos Registrados</h2>
              <p className="text-slate-600 text-sm">{products.length} {products.length === 1 ? 'producto' : 'productos'} en total</p>
            </div>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No hay productos agregados aún</p>
              <p className="text-slate-500 text-sm mt-1">Comienza agregando tu primer producto arriba</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod, idx) => (
                <div key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                  {prod.image && (
                    <div className="relative h-48 bg-slate-200 overflow-hidden">
                      <Image src={prod.image} alt={prod.name} width={400} height={192} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{prod.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{prod.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-600">${prod.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">{prod.marca}</span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{prod.categoria}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="flex-1 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-amber-200"
                        title="Editar producto"
                        aria-label="Editar producto"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-red-200"
                        title="Eliminar producto"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Servicios Registrados */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Servicios Registrados</h2>
              <p className="text-slate-600 text-sm">{services.length} {services.length === 1 ? 'servicio' : 'servicios'} en total</p>
            </div>
          </div>
          {services.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No hay servicios agregados aún</p>
              <p className="text-slate-500 text-sm mt-1">Comienza agregando tu primer servicio arriba</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                  {(srv.image || srv.icon) && (
                    <div className="relative h-40 bg-slate-200 flex items-center justify-center overflow-hidden">
                      {srv.image ? (
                        <Image src={srv.image} alt={srv.name || srv.title} width={160} height={160} className="w-24 h-24 object-cover rounded-2xl shadow-md" />
                      ) : (
                        <span className="text-6xl select-none" title="Emoji del servicio">{srv.icon}</span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{srv.name || srv.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{srv.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-600">{srv.price && srv.price.toString().startsWith('$') ? srv.price : `$${srv.price}`}</span>
                        {srv.duration && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium text-xs">{srv.duration}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditService(idx)}
                        className="flex-1 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-amber-200"
                        title="Editar servicio"
                        aria-label="Editar servicio"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteService(idx)}
                        className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-red-200"
                        title="Eliminar servicio"
                        aria-label="Eliminar servicio"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}