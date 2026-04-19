// ⚠️ ARCHIVO CORREGIDO - 3 CAMBIOS PRINCIPALES:
// 1. Línea ~1072: products.length cambiado a services.length
// 2. Líneas ~538-580: /api/products cambiado a /api/products/reorder
// 3. Añadido manejo correcto del endpoint de reordenamiento

"use client";
import { useState, useEffect } from "react";
import { Lock, LogOut, Key, Package, Edit2, Trash2, Save, X, Plus, Image as LucideImage, DollarSign, Tag, Layers, User, Eye, EyeOff, Sparkles, Star, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import ResultadosPanel from "./ResultadosPanel";
import ResultadosAdminGaleria from "./ResultadosAdminGaleria";
import { getAdminCredentials, setAdminCredentials } from "@/utils/adminConfigSupabase";

export default function AdminPanel() {
  // --- Estados de autenticación ---
  const [isAuth, setIsAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({ username: "", pass: "" });
  const [error, setError] = useState("");
  const [adminUser, setAdminUser] = useState("admin");
  const [adminPass, setAdminPass] = useState("admin123");
  const [showChangePass, setShowChangePass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // --- Estados de pestañas ---
  const [activeTab, setActiveTab] = useState<'servicios' | 'productos' | 'resultados'>('servicios');

  // --- Estados de Servicios ---
  const [services, setServices] = useState<any[]>([]);
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: null as File | null,
    icon: "",
    popular: false,
    promo: false
  });
  const [servicePreview, setServicePreview] = useState<string | null>(null);
  const [editServiceIndex, setEditServiceIndex] = useState<number | null>(null);

  // --- Estados de Productos ---
  const marcas = ["Otro", "Natú", "Amorenature", "Natural Center"];
  const categorias = ["Cuidado Facial", "Cuidado Corporal", "Cuidado Capilar", "Suplementos"];
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    marca: marcas[0],
    categoria: categorias[0],
    image: null as File | null,
    promo: false,
  });
  const [products, setProducts] = useState<Array<{ id?: string; name: string; description: string; price: string; marca: string; categoria: string; image: string | null; promo?: boolean; orden?: number }>>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const normalizeMarcaDisplay = (marca?: string) => (marca === "Bassa" ? "Otro" : marca || "");

  // Cargar credenciales
  useEffect(() => {
    getAdminCredentials().then(({ username, pass }) => {
      setAdminUser(username);
      setAdminPass(pass);
    });
  }, []);

  // Cargar productos
  useEffect(() => {
    if (isAuth) {
      fetch("/api/products")
        .then(res => res.json())
        .then(data => {
          // Ordenar por campo 'orden' si existe
          const sortedProducts = data.sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0));
          setProducts(sortedProducts);
        })
        .catch(() => setProducts([]));
    }
  }, [isAuth]);

  // Cargar servicios
  useEffect(() => {
    if (isAuth) {
      fetch("/api/services")
        .then(res => res.json())
        .then(data => setServices(data))
        .catch(() => setServices([]));
    }
  }, [isAuth]);

  // --- Funciones auxiliares ---
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login.username === adminUser && login.pass === adminPass) {
        setIsAuth(true);
        setError("");
        showNotification("¡Bienvenido! 👋", "success");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuth(false);
    setLogin({ username: "", pass: "" });
    showNotification("Sesión cerrada correctamente", "success");
  };

  // --- Funciones de Servicios ---
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

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación: Nombre obligatorio
    if (!service.name || service.name.trim().length === 0) {
      showNotification("❌ El nombre del servicio es obligatorio", "error");
      return;
    }

    // Validación: Nombre mínimo 3 caracteres
    if (service.name.trim().length < 3) {
      showNotification("❌ El nombre debe tener al menos 3 caracteres", "error");
      return;
    }

    // Validación: Nombre máximo 100 caracteres
    if (service.name.length > 100) {
      showNotification("❌ El nombre no puede tener más de 100 caracteres", "error");
      return;
    }

    // Validación: Precio obligatorio
    if (!service.price || String(service.price).trim() === "") {
      showNotification("❌ El precio es obligatorio", "error");
      return;
    }

    // Validación: Precio debe ser número positivo
    const precio = parseFloat(String(service.price));
    if (isNaN(precio) || precio < 0) {
      showNotification("❌ El precio debe ser un número válido mayor o igual a 0", "error");
      return;
    }

    // Validación: Precio máximo razonable
    if (precio > 99999) {
      showNotification("❌ El precio es demasiado alto. Máximo permitido: $99,999", "error");
      return;
    }

    // Validación: Descripción máximo 500 caracteres
    if (service.description && service.description.length > 500) {
      showNotification("❌ La descripción no puede tener más de 500 caracteres", "error");
      return;
    }

    // Validación: Duración máximo 50 caracteres
    if (service.duration && service.duration.length > 50) {
      showNotification("❌ La duración no puede tener más de 50 caracteres", "error");
      return;
    }

    // Validación: Al menos imagen o emoji
    if (!service.image && !service.icon && !servicePreview) {
      if (!window.confirm("⚠️ No has agregado una imagen ni un emoji. ¿Deseas continuar sin ellos?")) {
        return;
      }
    }

    // Validación: Tamaño de imagen
    if (service.image instanceof File) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (service.image.size > maxSize) {
        showNotification("❌ La imagen es demasiado grande. Máximo permitido: 5MB", "error");
        return;
      }

      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(service.image.type)) {
        showNotification("❌ Formato de imagen no válido. Usa: JPG, PNG, WEBP o GIF", "error");
        return;
      }
    }

    setLoading(true);
    let imgSrc = servicePreview || null;
    let icon = service.icon;
    
    if (service.image instanceof File) {
      try {
        imgSrc = await uploadToCloudinary(service.image);
      } catch (err: any) {
        showNotification("❌ Error al subir la imagen: " + err.message, "error");
        setLoading(false);
        return;
      }
    }

    try {
      let res;
      if (editServiceIndex !== null && services[editServiceIndex]?.id) {
        // UPDATE (PUT) servicio existente - mantener el orden
        res = await fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: services[editServiceIndex].id,
            name: service.name.trim(),
            title: service.name.trim(),
            description: service.description?.trim() || "",
            price: precio.toFixed(2),
            duration: service.duration?.trim() || "",
            image: imgSrc,
            icon: imgSrc ? "" : icon,
            popular: service.popular,
            promo: service.promo,
            orden: services[editServiceIndex].orden || editServiceIndex
          }),
        });
      } else {
        // CREAR (POST) servicio nuevo - asignar orden al final
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: service.name.trim(),
            title: service.name.trim(),
            description: service.description?.trim() || "",
            price: precio.toFixed(2),
            duration: service.duration?.trim() || "",
            image: imgSrc,
            icon: imgSrc ? "" : icon,
            popular: service.popular,
            promo: service.promo,
            orden: services.length
          }),
        });
      }
      
      if (!res.ok) throw new Error("Error al guardar servicio");
      
      const updated = await fetch("/api/services").then(r => r.json());
      setServices(updated);
      showNotification(editServiceIndex !== null ? "✅ Servicio actualizado correctamente" : "✨ Servicio agregado correctamente", "success");
      setService({ name: "", description: "", price: "", duration: "", image: null, icon: "", popular: false, promo: false });
      setServicePreview(null);
      setEditServiceIndex(null);
    } catch (err: any) {
      showNotification("❌ Error: " + err.message, "error");
    }
    setLoading(false);
  };

  const handleEditService = (index: number) => {
    const srv = services[index];
    setService({
      name: srv.name || srv.title || "",
      description: srv.description || "",
      price: srv.price || "",
      duration: srv.duration || "",
      image: null,
      icon: srv.icon || "",
      popular: srv.popular || false,
      promo: srv.promo || false
    });
    setServicePreview(srv.image || null);
    setEditServiceIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        
        const updated = await fetch("/api/services").then(r => r.json());
        setServices(updated);
        showNotification("Servicio eliminado correctamente", "success");
        
        if (editServiceIndex === index) {
          setService({ name: "", description: "", price: "", duration: "", image: null, icon: "", popular: false, promo: false });
          setServicePreview(null);
          setEditServiceIndex(null);
        }
      } catch (err: any) {
        showNotification("Error: " + err.message, "error");
      }
      setLoading(false);
    }
  };

  // --- Funciones de Productos ---
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
    // ...validaciones existentes...
    // (copiar aquí todo el bloque de validaciones y subida de imagen)

    // Validación: Nombre obligatorio
    if (!product.name || product.name.trim().length === 0) {
      showNotification("❌ El nombre del producto es obligatorio", "error");
      return;
    }
    if (product.name.trim().length < 3) {
      showNotification("❌ El nombre debe tener al menos 3 caracteres", "error");
      return;
    }
    if (product.name.length > 100) {
      showNotification("❌ El nombre no puede tener más de 100 caracteres", "error");
      return;
    }
    if (!product.price || String(product.price).trim() === "") {
      showNotification("❌ El precio es obligatorio", "error");
      return;
    }
    const precio = parseFloat(String(product.price));
    if (isNaN(precio) || precio < 0) {
      showNotification("❌ El precio debe ser un número válido mayor o igual a 0", "error");
      return;
    }
    if (precio > 99999) {
      showNotification("❌ El precio es demasiado alto. Máximo permitido: $99,999", "error");
      return;
    }
    if (product.description && product.description.length > 500) {
      showNotification("❌ La descripción no puede tener más de 500 caracteres", "error");
      return;
    }
    if (!product.marca || product.marca.trim().length === 0) {
      showNotification("❌ Debes seleccionar una marca", "error");
      return;
    }
    if (!product.categoria || product.categoria.trim().length === 0) {
      showNotification("❌ Debes seleccionar una categoría", "error");
      return;
    }
    if (!product.image && !preview) {
      if (!window.confirm("⚠️ No has agregado una imagen del producto. ¿Deseas continuar sin ella?")) {
        return;
      }
    }
    if (product.image instanceof File) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (product.image.size > maxSize) {
        showNotification("❌ La imagen es demasiado grande. Máximo permitido: 5MB", "error");
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(product.image.type)) {
        showNotification("❌ Formato de imagen no válido. Usa: JPG, PNG, WEBP o GIF", "error");
        return;
      }
    }
    setLoading(true);
    let imgSrc = preview || null;
    if (product.image instanceof File) {
      try {
        imgSrc = await uploadToCloudinary(product.image);
      } catch (err: any) {
        showNotification("❌ Error al subir la imagen: " + err.message, "error");
        setLoading(false);
        return;
      }
    }

    try {
      let res;
      if (editIndex !== null && products[editIndex]?.id) {
        // UPDATE (PUT) producto existente
        res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: products[editIndex].id,
            name: product.name.trim(),
            description: product.description?.trim() || "",
            price: precio.toFixed(2),
            marca: product.marca,
            categoria: product.categoria,
            image: imgSrc,
            promo: product.promo,
            orden: products[editIndex].orden || (editIndex + 1),
          }),
        });
      } else {
        // CREAR (POST) producto nuevo
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: product.name.trim(),
            description: product.description?.trim() || "",
            price: precio.toFixed(2),
            marca: product.marca,
            categoria: product.categoria,
            image: imgSrc,
            promo: product.promo,
            orden: products.length + 1,
          }),
        });
      }

      if (!res.ok) throw new Error("Error al guardar producto");

      // Recargar productos
      const updated = await fetch("/api/products").then(r => r.json());
      const sortedProducts = updated.sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0));
      setProducts(sortedProducts);

      showNotification(editIndex !== null ? "✅ Producto actualizado correctamente" : "✨ Producto agregado correctamente", "success");
      setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null, promo: false });
      setPreview(null);
      setEditIndex(null);
    } catch (err: any) {
      showNotification("❌ Error: " + err.message, "error");
    }
    setLoading(false);
  };

  const handleEdit = (index: number) => {
    const prod = products[index];
    setProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      marca: normalizeMarcaDisplay(prod.marca),
      categoria: prod.categoria,
      image: null,
      promo: prod.promo || false,
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
        
        const updated = await fetch("/api/products").then(r => r.json());
        const sortedProducts = updated.sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0));
        setProducts(sortedProducts);
        showNotification("Producto eliminado correctamente", "success");
        
        if (editIndex === index) {
          setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null, promo: false });
          setPreview(null);
          setEditIndex(null);
        }
      } catch (err: any) {
        showNotification("Error: " + err.message, "error");
      }
      setLoading(false);
    }
  };

  // ✅ CORREGIDO: Función para mover producto hacia arriba
  const moveProductUp = async (index: number) => {
    if (index === 0) return; // Ya está al principio
    
    setLoading(true);
    const newProducts = [...products];
    // Intercambiar posiciones
    [newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
    
    try {
      // Actualizar orden en la base de datos
      const updates = [
        { id: newProducts[index].id, orden: index + 1 },
        { id: newProducts[index - 1].id, orden: index }
      ];
      
      // ⚠️ CAMBIO AQUÍ: /api/products/reorder en vez de /api/products
      const response = await fetch('/api/products/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (!response.ok) throw new Error('Error al actualizar');
      
      setProducts(newProducts);
      showNotification("✅ Orden actualizado", "success");
    } catch (error) {
      showNotification("❌ Error al actualizar orden", "error");
      console.error(error);
    }
    setLoading(false);
  };

  // ✅ CORREGIDO: Función para mover producto hacia abajo
  const moveProductDown = async (index: number) => {
    if (index === products.length - 1) return; // Ya está al final
    
    setLoading(true);
    const newProducts = [...products];
    // Intercambiar posiciones
    [newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
    
    try {
      const updates = [
        { id: newProducts[index].id, orden: index + 1 },
        { id: newProducts[index + 1].id, orden: index + 2 }
      ];
      
      // ⚠️ CAMBIO AQUÍ: /api/products/reorder en vez de /api/products
      const response = await fetch('/api/products/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (!response.ok) throw new Error('Error al actualizar');
      
      setProducts(newProducts);
      showNotification("✅ Orden actualizado", "success");
    } catch (error) {
      showNotification("❌ Error al actualizar orden", "error");
      console.error(error);
    }
    setLoading(false);
  };

  const moveServiceUp = async (index: number) => {
    if (index === 0) return;
    setLoading(true);
    const newServices = [...services];
    [newServices[index], newServices[index - 1]] = [newServices[index - 1], newServices[index]];
    
    try {
      // Reasignar órdenes secuenciales a TODOS los servicios
      const updatePromises = newServices.map((srv, idx) =>
        fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: srv.id,
            orden: idx
          })
        })
      );
      
      await Promise.all(updatePromises);
      
      // Refrescar lista desde servidor
      const updated = await fetch("/api/services").then(r => r.json());
      setServices(updated);
      showNotification("✅ Orden actualizado", "success");
    } catch (error) {
      showNotification("❌ Error al actualizar orden", "error");
      console.error(error);
    }
    setLoading(false);
  };

  const moveServiceDown = async (index: number) => {
    if (index === services.length - 1) return;
    setLoading(true);
    const newServices = [...services];
    [newServices[index], newServices[index + 1]] = [newServices[index + 1], newServices[index]];
    
    try {
      // Reasignar órdenes secuenciales a TODOS los servicios
      const updatePromises = newServices.map((srv, idx) =>
        fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: srv.id,
            orden: idx
          })
        })
      );
      
      await Promise.all(updatePromises);
      
      // Refrescar lista desde servidor
      const updated = await fetch("/api/services").then(r => r.json());
      setServices(updated);
      showNotification("✅ Orden actualizado", "success");
    } catch (error) {
      showNotification("❌ Error al actualizar orden", "error");
      console.error(error);
    }
    setLoading(false);
  };

  const handleSavePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return;
    }
    if (newPass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    setLoading(true);
    try {
      await setAdminCredentials({ username: newUser, pass: newPass });
      setAdminUser(newUser);
      setAdminPass(newPass);
      setShowChangePass(false);
      setError("");
      setNewPass("");
      setNewUser("");
      showNotification("Credenciales actualizadas correctamente", "success");
    } catch (err: any) {
      setError("Error al guardar: " + err.message);
    }
    setLoading(false);
  };

  // ==========================================
  // PANTALLA DE LOGIN PREMIUM
  // ==========================================
  if (!isAuth) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-elegant-cream via-white to-elegant-champagne flex items-center justify-center p-4">
        {/* Partículas de fondo doradas */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-elegant-pearl via-white to-gold-100"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold-500/25 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-bronze-400/15 rounded-full blur-3xl"></div>
        </div>

        {/* Partículas flotantes doradas */}
        <div className="particles-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>

        {/* Logo flotante arriba */}
        <Link 
          href="/"
          className="absolute top-8 left-8 flex items-center gap-3 group z-20"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-2xl ring-2 ring-gold-400/30 group-hover:ring-gold-400/50 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="R&R Dermobotanics" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-medium text-elegant-charcoal hidden sm:block">
            Volver al inicio
          </span>
        </Link>

        {/* Card principal del login */}
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-card rounded-3xl shadow-2xl p-8 md:p-10 animate-scale-in">
            {/* Header con icono dorado */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-bronze-500 shadow-xl shadow-gold-500/30 mb-6 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/50 to-transparent blur-xl"></div>
                <Lock className="w-10 h-10 text-white relative z-10" />
              </div>

              <h1 className="text-3xl md:text-4xl font-light text-elegant-charcoal mb-2">
                Panel de
                <span className="block font-semibold bg-gradient-to-r from-gold-600 via-gold-500 to-bronze-500 bg-clip-text text-transparent mt-1">
                  Administración
                </span>
              </h1>
              
              <p className="text-sm text-gray-600 mt-3">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Campo Usuario */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gold-500" />
                  Usuario
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={login.username}
                    onChange={(e) => { setLogin({ ...login, username: e.target.value }); setError(""); }}
                    className="w-full px-4 py-3.5 bg-white/80 border-2 border-gold-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-gold-400/30 focus:border-gold-400 text-slate-800 transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Ingresa tu usuario"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold-500" />
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={login.pass}
                    onChange={(e) => { setLogin({ ...login, pass: e.target.value }); setError(""); }}
                    className="w-full px-4 py-3.5 bg-white/80 border-2 border-gold-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-gold-400/30 focus:border-gold-400 text-slate-800 transition-all duration-300 placeholder:text-gray-400 pr-12"
                    placeholder="Ingresa tu contraseña"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-600 transition-colors duration-200"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in-up flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Botón de login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative px-8 py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-white rounded-xl font-bold text-lg shadow-xl hover:from-gold-600 hover:to-gold-400 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group overflow-hidden"
              >
                {/* Efecto shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                
                {/* Contenido del botón */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Iniciar Sesión
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer del card */}
            <div className="mt-8 pt-6 border-t border-gold-200/50">
              <p className="text-center text-sm text-gray-600">
                ¿Olvidaste tu contraseña?{" "}
                <button 
                  onClick={() => alert("Contacta al administrador del sistema")}
                  className="text-gold-600 hover:text-gold-700 font-semibold hover:underline transition-colors"
                >
                  Contactar soporte
                </button>
              </p>
            </div>
          </div>

          {/* Decorative dots dorados */}
          <div className="absolute -top-4 -right-4 w-3 h-3 bg-gold-500 rounded-full opacity-80 animate-float shadow-lg shadow-gold-500/50"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-gold-400 rounded-full opacity-70 animate-float shadow-lg shadow-gold-400/50" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 -right-6 w-2 h-2 bg-bronze-400 rounded-full opacity-60 animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Frase elegante en el footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <p className="text-sm text-gray-500 font-light tracking-wide">
            Ciencia y Naturaleza en Perfecta Armonía
          </p>
        </div>
      </div>
    );
  }

  const normalizedProductSearch = productSearch.trim().toLowerCase();
  const filteredProducts = products
    .map((prod, idx) => ({ prod, idx }))
    .filter(({ prod }) => {
      if (!normalizedProductSearch) return true;

      const searchableText = [
        prod.name,
        prod.description,
        prod.marca,
        normalizeMarcaDisplay(prod.marca),
        prod.categoria,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedProductSearch);
    });

  // ==========================================
  // PANEL PRINCIPAL (después del login)
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-8 px-4">
      {/* Notificaciones */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg font-semibold text-white animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 mb-8 border border-[#e7dbc2]/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-4 shadow-sm border border-[#e7dbc2]/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse"></div>
                <span className="text-xs font-medium text-[#4a4a4a] tracking-[0.15em] uppercase">Panel Admin</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-[#3a3a3a] mb-1">
                Panel de <span className="font-semibold bg-gradient-to-r from-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">Administración</span>
              </h1>
              <p className="text-[#5a5a5a] text-base">Gestiona tu negocio de forma fácil y rápida</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowChangePass(true)}
                className="px-4 py-2 bg-white/80 hover:bg-[#faf8f5] text-[#3a3a3a] rounded-xl font-semibold transition-all flex items-center gap-2 border border-[#e7dbc2]/30"
              >
                <Key className="w-4 h-4 text-[#c9a962]" />
                <span className="hidden sm:inline">Cambiar Credenciales</span>
                <span className="sm:hidden">Credenciales</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-all flex items-center gap-2 border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>

          {/* Pestañas mejoradas */}
          <div className="flex gap-2 mt-6 border-b border-[#e7dbc2]/40 overflow-x-auto">
            <button
              onClick={() => setActiveTab('servicios')}
              className={`px-6 py-3 font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'servicios'
                  ? 'bg-gold-50 text-[#c9a962] border-b-2 border-[#c9a962]'
                  : 'text-[#5a5a5a] hover:text-[#3a3a3a] hover:bg-gold-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Servicios
              <span className="bg-gold-100 text-[#c9a962] px-2 py-0.5 rounded-full text-xs font-bold">{services.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('productos')}
              className={`px-6 py-3 font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'productos'
                  ? 'bg-bronze-50 text-[#b8954d] border-b-2 border-[#b8954d]'
                  : 'text-[#5a5a5a] hover:text-[#3a3a3a] hover:bg-bronze-50'
              }`}
            >
              <Package className="w-4 h-4" />
              Productos
              <span className="bg-bronze-100 text-[#b8954d] px-2 py-0.5 rounded-full text-xs font-bold">{products.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('resultados')}
              className={`px-6 py-3 font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'resultados'
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500'
                  : 'text-[#5a5a5a] hover:text-[#3a3a3a] hover:bg-purple-50'
              }`}
            >
              <Star className="w-4 h-4" />
              Resultados
            </button>
          </div>
        </div>

        {/* CONTENIDO DE SERVICIOS */}
        {activeTab === 'servicios' && (
          <>
            {/* Formulario de Servicios */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  {editServiceIndex !== null ? <Edit2 className="w-5 h-5 text-amber-600" /> : <Plus className="w-5 h-5 text-amber-600" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editServiceIndex !== null ? "Editar Servicio" : "Agregar Nuevo Servicio"}
                  </h2>
                  <p className="text-slate-600 text-sm">Los campos marcados con * son obligatorios</p>
                </div>
              </div>
              
              <form onSubmit={handleServiceSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center justify-between">
                      <span>
                        Nombre del Servicio <span className="text-red-500">*</span>
                      </span>
                      <span className={`text-xs font-normal ${service.name.length > 100 ? 'text-red-500' : 'text-slate-500'}`}>
                        {service.name.length}/100
                      </span>
                    </label>
                    <input
                      type="text"
                      value={service.name}
                      onChange={e => setService({ ...service, name: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-slate-800 bg-white ${
                        service.name.length > 100 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-slate-300 focus:ring-amber-500'
                      }`}
                      placeholder="Ej: Masaje Relajante Premium"
                      maxLength={120}
                      required
                    />
                    {service.name.length > 100 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El nombre es demasiado largo</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center justify-between">
                      <span>Descripción</span>
                      <span className={`text-xs font-normal ${service.description.length > 500 ? 'text-red-500' : 'text-slate-500'}`}>
                        {service.description.length}/500
                      </span>
                    </label>
                    <textarea
                      value={service.description}
                      onChange={e => setService({ ...service, description: e.target.value })}
                      rows={3}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-slate-800 bg-white resize-none ${
                        service.description.length > 500 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-slate-300 focus:ring-amber-500'
                      }`}
                      placeholder="Describe brevemente el servicio..."
                      maxLength={550}
                    />
                    {service.description.length > 500 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ La descripción es demasiado larga</p>
                    )}
                  </div>

                  {/* Precio */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Precio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={service.price}
                      onChange={e => setService({ ...service, price: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 bg-white"
                      placeholder="0.00"
                      min="0"
                      max="99999"
                      step="0.01"
                      required
                    />
                    {service.price && parseFloat(service.price) > 99999 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El precio máximo es $99,999</p>
                    )}
                    {service.price && parseFloat(service.price) < 0 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El precio no puede ser negativo</p>
                    )}
                  </div>

                  {/* Duración */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700">Duración</label>
                    <input
                      type="text"
                      value={service.duration}
                      onChange={e => setService({ ...service, duration: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 bg-white"
                      placeholder="Ej: 60 min"
                    />
                  </div>

                  {/* Imagen o Emoji */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <LucideImage className="w-4 h-4" />
                      Imagen o Emoji (opcional)
                    </label>
                    <div className="flex gap-3 items-start flex-col sm:flex-row">
                      <div className="flex-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleServiceImage}
                          aria-label="Imagen del servicio"
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-700 file:font-medium hover:file:bg-amber-100 file:cursor-pointer cursor-pointer text-sm"
                        />
                        {service.image instanceof File && (
                          <p className="text-xs text-slate-500 mt-1">
                            📎 {(service.image.size / 1024).toFixed(0)} KB 
                            {service.image.size > 5 * 1024 * 1024 && (
                              <span className="text-red-500 ml-2">⚠️ Demasiado grande (máx. 5MB)</span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium text-sm">o usa emoji:</span>
                        <input
                          type="text"
                          maxLength={2}
                          value={service.icon}
                          onChange={e => setService({ ...service, icon: e.target.value })}
                          className="w-16 border border-slate-300 rounded-xl px-3 py-3 text-2xl text-center focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          placeholder="💆"
                        />
                      </div>
                    </div>
                    
                    {/* Preview */}
                    {servicePreview ? (
                      <div className="mt-4 relative inline-block">
                        <Image src={servicePreview} alt="Preview" width={128} height={128} className="rounded-xl shadow-md w-32 h-32 object-cover border-2 border-slate-200" />
                        <button
                          type="button"
                          onClick={() => {
                            setServicePreview(null);
                            setService({ ...service, image: null });
                          }}
                          aria-label="Eliminar imagen"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : service.icon ? (
                      <div className="mt-4 text-6xl">{service.icon}</div>
                    ) : null}
                  </div>

                  {/* Checkboxes */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <input
                        type="checkbox"
                        id="popular-service"
                        checked={service.popular}
                        onChange={e => setService({ ...service, popular: e.target.checked })}
                        className="accent-amber-500 w-5 h-5 rounded cursor-pointer"
                      />
                      <label htmlFor="popular-service" className="text-sm text-slate-700 font-medium cursor-pointer flex-1">
                        ⭐ Marcar como <strong>Servicio Popular</strong> (se destacará en la página)
                      </label>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <input
                        type="checkbox"
                        id="promo-service"
                        checked={service.promo}
                        onChange={e => setService({ ...service, promo: e.target.checked })}
                        className="accent-pink-500 w-5 h-5 rounded cursor-pointer"
                      />
                      <label htmlFor="promo-service" className="text-sm text-slate-700 font-medium cursor-pointer flex-1">
                        🎁 <strong>Servicio en Promoción</strong> (tendrá una insignia especial)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? "Guardando..." : (
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
                        setService({ name: "", description: "", price: "", duration: "", image: null, icon: "", popular: false, promo: false });
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

            {/* ✅ CORREGIDO: Lista de Servicios - Cambio en línea 1072 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Layers className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Servicios Registrados</h2>
                  <p className="text-slate-600 text-sm">{services.length} servicio{services.length !== 1 ? 's' : ''} en total</p>
                </div>
              </div>
              
              {/* ⚠️ CAMBIO AQUÍ: services.length en vez de products.length */}
              {services.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium text-lg">No hay servicios aún</p>
                  <p className="text-slate-500 text-sm mt-1">Agrega tu primer servicio usando el formulario de arriba</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((srv, idx) => (
                    <div key={idx} className="group relative bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all">
                      
                      {/* Badge de posición */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-xl border-2 border-white">
                          #{idx + 1}
                        </div>
                      </div>

                      {/* Botones de ordenamiento */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                        <button
                          onClick={() => moveServiceUp(idx)}
                          disabled={idx === 0 || loading}
                          className={`p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl transition-all border-2 ${
                            idx === 0 
                              ? 'opacity-30 cursor-not-allowed border-slate-200' 
                              : 'hover:bg-amber-500 hover:text-white hover:scale-110 hover:shadow-2xl border-amber-200 hover:border-amber-400'
                          }`}
                          title="Subir posición"
                        >
                          <ArrowUp className="w-5 h-5" strokeWidth={3} />
                        </button>
                        
                        <button
                          onClick={() => moveServiceDown(idx)}
                          disabled={idx === services.length - 1 || loading}
                          className={`p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl transition-all border-2 ${
                            idx === services.length - 1
                              ? 'opacity-30 cursor-not-allowed border-slate-200'
                              : 'hover:bg-amber-500 hover:text-white hover:scale-110 hover:shadow-2xl border-amber-200 hover:border-amber-400'
                          }`}
                          title="Bajar posición"
                        >
                          <ArrowDown className="w-5 h-5" strokeWidth={3} />
                        </button>
                      </div>

                      {/* Imagen/Emoji */}
                      {(srv.image || srv.icon) && (
                        <div className="relative h-40 bg-gradient-to-br from-amber-50 to-slate-100 flex items-center justify-center overflow-hidden">
                          {srv.image ? (
                            <Image src={srv.image} alt={srv.name || srv.title} width={160} height={160} className="w-24 h-24 object-cover rounded-2xl shadow-lg" />
                          ) : (
                            <span className="text-6xl" title="Emoji">{srv.icon}</span>
                          )}
                          {/* Badges */}
                          <div className="absolute top-2 right-2 flex gap-1">
                            {srv.popular && (
                              <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">⭐ Popular</span>
                            )}
                            {srv.promo && (
                              <span className="px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-full shadow-md">🎁 Promo</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-5">
                        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{srv.name || srv.title}</h3>
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2 min-h-[40px]">{srv.description || "Sin descripción"}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-amber-600">
                            {srv.price?.toString().startsWith('$') ? srv.price : `$${srv.price}`}
                          </span>
                          {srv.duration && (
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium text-xs">
                              ⏱️ {srv.duration}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditService(idx)}
                            className="flex-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-amber-200 text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteService(idx)}
                            className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-red-200 text-sm"
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
          </>
        )}

        {/* CONTENIDO DE PRODUCTOS */}
        {activeTab === 'productos' && (
          <>
            {/* Formulario de Productos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  {editIndex !== null ? <Edit2 className="w-5 h-5 text-emerald-600" /> : <Plus className="w-5 h-5 text-emerald-600" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editIndex !== null ? "Editar Producto" : "Agregar Nuevo Producto"}
                  </h2>
                  <p className="text-slate-600 text-sm">Los campos marcados con * son obligatorios</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Nombre del Producto <span className="text-red-500">*</span>
                      </span>
                      <span className={`text-xs font-normal ${product.name.length > 100 ? 'text-red-500' : 'text-slate-500'}`}>
                        {product.name.length}/100
                      </span>
                    </label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-slate-800 bg-white ${
                        product.name.length > 100 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-slate-300 focus:ring-emerald-500'
                      }`}
                      placeholder="Ej: Crema Hidratante Natural"
                      maxLength={120}
                      required
                    />
                    {product.name.length > 100 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El nombre es demasiado largo</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center justify-between">
                      <span>Descripción</span>
                      <span className={`text-xs font-normal ${product.description.length > 500 ? 'text-red-500' : 'text-slate-500'}`}>
                        {product.description.length}/500
                      </span>
                    </label>
                    <textarea
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      rows={3}
                      className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-slate-800 bg-white resize-none ${
                        product.description.length > 500 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-slate-300 focus:ring-emerald-500'
                      }`}
                      placeholder="Describe las características del producto..."
                      maxLength={550}
                    />
                    {product.description.length > 500 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ La descripción es demasiado larga</p>
                    )}
                  </div>

                  {/* Precio */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Precio <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                      placeholder="0.00"
                      min="0"
                      max="99999"
                      step="0.01"
                      required
                    />
                    {product.price && parseFloat(product.price) > 99999 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El precio máximo es $99,999</p>
                    )}
                    {product.price && parseFloat(product.price) < 0 && (
                      <p className="text-red-500 text-xs mt-1">⚠️ El precio no puede ser negativo</p>
                    )}
                  </div>

                  {/* Marca */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Marca
                    </label>
                    <select
                      value={product.marca}
                      onChange={(e) => setProduct({ ...product, marca: e.target.value })}
                      aria-label="Marca del producto"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                    >
                      {marcas.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Categoría
                    </label>
                    <select
                      value={product.categoria}
                      onChange={(e) => setProduct({ ...product, categoria: e.target.value })}
                      aria-label="Categoría del producto"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                    >
                      {categorias.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-700 flex items-center gap-2">
                      <LucideImage className="w-4 h-4" />
                      Imagen del Producto
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      aria-label="Imagen del producto"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-medium hover:file:bg-emerald-100 file:cursor-pointer cursor-pointer text-sm"
                    />
                    {product.image instanceof File && (
                      <p className="text-xs text-slate-500 mt-1">
                        📎 {(product.image.size / 1024).toFixed(0)} KB
                        {product.image.size > 5 * 1024 * 1024 && (
                          <span className="text-red-500 ml-2">⚠️ Demasiado grande (máx. 5MB)</span>
                        )}
                      </p>
                    )}
                    {preview && (
                      <div className="mt-4 relative inline-block">
                        <Image src={preview} alt="Preview" width={128} height={128} className="rounded-xl shadow-md w-32 h-32 object-cover border-2 border-slate-200" />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setProduct({ ...product, image: null });
                          }}
                          aria-label="Eliminar imagen"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Checkbox Promoción */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border-2 border-pink-200 hover:border-pink-300 transition-colors">
                      <input
                        type="checkbox"
                        id="promo-product"
                        checked={product.promo}
                        onChange={e => setProduct({ ...product, promo: e.target.checked })}
                        className="accent-pink-500 w-5 h-5 rounded cursor-pointer"
                      />
                      <label htmlFor="promo-product" className="text-sm text-slate-700 font-semibold cursor-pointer flex-1 flex items-center gap-2">
                        🎁 <strong className="text-pink-600">Producto en Promoción</strong> 
                        <span className="text-slate-600 font-normal">(se mostrará con insignia especial)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? "Guardando..." : (
                      <>
                        {editIndex !== null ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {editIndex !== null ? "Guardar Cambios" : "Agregar Producto"}
                      </>
                    )}
                  </button>
                  
                  {editIndex !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setProduct({ name: "", description: "", price: "", marca: marcas[0], categoria: categorias[0], image: null, promo: false });
                        setPreview(null);
                        setEditIndex(null);
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

            {/* Lista de Productos */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Productos Registrados</h2>
                  <p className="text-slate-600 text-sm">
                    {products.length} producto{products.length !== 1 ? 's' : ''} en total
                    {normalizedProductSearch && (
                      <span className="ml-2 text-emerald-700 font-medium">• {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}</span>
                    )}
                  </p>
                </div>
              </div>

              {products.length > 0 && (
                <div className="mb-6">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Buscar por nombre, marca, categoría o descripción..."
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                  />
                </div>
              )}
              
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium text-lg">No hay productos aún</p>
                  <p className="text-slate-500 text-sm mt-1">Agrega tu primer producto usando el formulario de arriba</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium text-lg">No se encontraron productos</p>
                  <p className="text-slate-500 text-sm mt-1">Prueba con otro término de búsqueda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(({ prod, idx }) => (
                    <div key={prod.id || idx} className="group relative bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all">
                      
                      {/* Badge de posición */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xl border-2 border-white">
                          #{idx + 1}
                        </div>
                      </div>

                      {/* Botones de ordenamiento */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                        <button
                          onClick={() => moveProductUp(idx)}
                          disabled={idx === 0 || loading}
                          className={`p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl transition-all border-2 ${
                            idx === 0 
                              ? 'opacity-30 cursor-not-allowed border-slate-200' 
                              : 'hover:bg-emerald-500 hover:text-white hover:scale-110 hover:shadow-2xl border-emerald-200 hover:border-emerald-400'
                          }`}
                          title="Subir posición"
                        >
                          <ArrowUp className="w-5 h-5" strokeWidth={3} />
                        </button>
                        
                        <button
                          onClick={() => moveProductDown(idx)}
                          disabled={idx === products.length - 1 || loading}
                          className={`p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl transition-all border-2 ${
                            idx === products.length - 1
                              ? 'opacity-30 cursor-not-allowed border-slate-200'
                              : 'hover:bg-emerald-500 hover:text-white hover:scale-110 hover:shadow-2xl border-emerald-200 hover:border-emerald-400'
                          }`}
                          title="Bajar posición"
                        >
                          <ArrowDown className="w-5 h-5" strokeWidth={3} />
                        </button>
                      </div>

                      {prod.image && (
                        <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-slate-100 overflow-hidden">
                          <Image src={prod.image} alt={prod.name} width={400} height={192} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      
                      <div className="p-5">
                        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{prod.name}</h3>
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2 min-h-[40px]">{prod.description || "Sin descripción"}</p>
                        {/* Etiqueta de categoría */}
                        <div className="mb-2">
                          <span className="block text-xs font-bold bg-amber-100 text-amber-700 rounded-full px-3 py-1 mb-1">{prod.categoria}</span>
                          {/* Mostrar marca debajo de la categoría si es una de las 4 */}
                          {['Natu', 'Bassa', 'Otro', 'Amorenature', 'Natural Center'].includes(prod.marca) && (
                            <span className="block text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 mt-1">{normalizeMarcaDisplay(prod.marca)}</span>
                          )}
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-emerald-600">${prod.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                             {prod.promo && (
                              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium flex items-center gap-1">
                                🎁 Promoción
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(idx)}
                            className="flex-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-emerald-200 text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-red-200 text-sm"
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
          </>
        )}

        {/* CONTENIDO DE RESULTADOS */}
        {activeTab === 'resultados' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <ResultadosPanel />
            <ResultadosAdminGaleria />
          </div>
        )}
      </div>

      {/* Modal de cambio de contraseña */}
      {showChangePass && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => {
              setShowChangePass(false);
              setNewPass("");
              setNewUser("");
              setError("");
            }}
          />
          
          <aside className="relative ml-auto w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right overflow-y-auto">
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Key className="w-6 h-6" /> Cambiar Credenciales
                </h2>
                <button
                  onClick={() => {
                    setShowChangePass(false);
                    setNewPass("");
                    setNewUser("");
                    setError("");
                  }}
                  aria-label="Cerrar"
                  className="p-2 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-slate-600 text-sm mb-6">
                Actualiza tu usuario y contraseña para mayor seguridad.
              </p>
              
              <form onSubmit={handleSavePass} className="flex-1 flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4"/>
                      Nuevo Usuario
                    </label>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">
                      Actual: {adminUser}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    onFocus={() => { if (!newUser) setNewUser(adminUser); }}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 bg-white"
                    placeholder="Mínimo 3 caracteres"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-700">Nueva Contraseña</label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-slate-800 p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 bg-white"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}
                
                <div className="flex gap-3 mt-auto pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? "Guardando..." : "Guardar Cambios"}
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
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}