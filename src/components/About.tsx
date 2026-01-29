const values = [
  {
    icon: "🌱",
    title: "100% Natural",
    description: "Ingredientes de origen vegetal y orgánico certificado.",
  },
  {
    icon: "🔬",
    title: "Base Científica",
    description: "Fórmulas desarrolladas con respaldo dermatológico.",
  },
  {
    icon: "🐰",
    title: "Cruelty Free",
    description: "No testeamos en animales. Belleza consciente.",
  },
  {
    icon: "♻️",
    title: "Eco-Friendly",
    description: "Packaging sostenible y prácticas responsables.",
  },
];

const marcas = [
  {
    nombre: "Bassa",
    imagen: "🧴",
    descripcion: "Cuidado profesional de la piel con fórmulas avanzadas",
    categorias: ["Facial", "Profesional", "Tratamientos"],
    color: "#2d5a3d",
  },
  {
    nombre: "Natú",
    imagen: "🌿",
    descripcion: "Productos 100% naturales para el cuidado de tu piel",
    categorias: ["Natural", "Corporal", "Orgánico"],
    color: "#4a7c59",
  },
  {
    nombre: "Amorenature",
    imagen: "✨",
    descripcion: "Rutinas skincare completas para una piel radiante",
    categorias: ["Skincare", "Rutinas", "Facial"],
    color: "#c9a962",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main About */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden max-w-sm mx-auto lg:max-w-none">
              <img
                src="/hands-nature.jpg"
                alt="Manos hacia la naturaleza y luz solar"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl md:rounded-3xl">
                <div className="text-center text-white p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow">Rest & Relax</h3>
                  <p className="text-base md:text-lg opacity-90 drop-shadow">DERMOBOTANICS</p>
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                    <p className="text-xs md:text-sm opacity-75 drop-shadow">Manta, Ecuador</p>
                    <p className="text-xs md:text-sm opacity-75 drop-shadow">Cuidado natural de la piel</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Stats - Hidden on mobile */}
            <div className="hidden md:block absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 border border-[#2d5a3d]/10">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2d5a3d]">3</p>
                <p className="text-sm text-[#5a5a5a]">Marcas Premium</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="inline-block px-4 py-2 bg-[#2d5a3d]/10 rounded-full text-xs md:text-sm text-[#2d5a3d] font-medium mb-4">
              Nuestra Historia
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4a4a4a] mb-4 md:mb-6">
              Belleza que <span className="text-[#bfa14a]">Conecta</span> con la Naturaleza
            </h2>
            <p className="text-base md:text-lg text-[#5a5a5a] mb-4 md:mb-6 leading-relaxed">
              Rest and Relax Dermobotanics es estética, spa y cuidado consciente de la piel. Brindamos tratamientos y productos seleccionados que promueven bienestar, equilibrio y calma.<br />
              Aquí no vendemos magia, cultivamos bienestar integral.
            </p>
            <div className="p-4 md:p-6 bg-[#f8f6f3] rounded-2xl border-l-4 border-[#2d5a3d] text-left">
              <h4 className="font-bold text-[#2d5a3d] mb-2 text-sm md:text-base">Misión</h4>
              <p className="text-[#5a5a5a] text-sm md:text-base">
                Ofrecemos productos de cuidado natural y experiencias estéticas que integran extractos botánicos con respaldo dermatológico, promoviendo la salud, el bienestar y el equilibrio de la piel de forma segura y eficaz.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-[#d4b886] via-[#c9a962] to-[#b8954d] bg-clip-text text-transparent">Nuestros Valores</h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse"></div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 rounded-2xl bg-[#fafafa] hover-lift"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-[#d4b886]/20 to-[#c9a962]/20 flex items-center justify-center text-2xl md:text-3xl text-[#c9a962] shadow-lg">
                  {value.icon}
                </div>
                <h4 className="font-bold text-[#4a4a4a] mb-1 md:mb-2 text-sm md:text-base">{value.title}</h4>
                <p className="text-xs md:text-sm text-[#5a5a5a]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Catálogo de Marcas */}
        {/* Catálogo de Marcas eliminado por solicitud */}
      </div>
    </section>
  );
}
