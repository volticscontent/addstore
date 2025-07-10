"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Truck,
  RotateCcw,
  Gift,
  Info,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Instagram,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

const productImages = [
  "/placeholder.svg?height=600&width=600&text=Jersey+Principal",
  "/placeholder.svg?height=600&width=600&text=Jersey+Frente",
  "/placeholder.svg?height=600&width=600&text=Jersey+Costas",
  "/placeholder.svg?height=600&width=600&text=Jersey+Detalhe",
  "/placeholder.svg?height=600&width=600&text=Jersey+Modelo",
]

const players = [
  "A.VEGA 10",
  "C.HUERTA 21",
  "E.ÁLVAREZ 4",
  "J.QUIÑONES 16",
  "L.CHÁVEZ 18",
  "L.ROMO 7",
  "ORBELÍN 17",
  "R.ALVARADO 22",
  "RAÚL 9",
  "S.GIMENEZ 11",
]

const sizes = [
  { size: "XS", available: true },
  { size: "S", available: true },
  { size: "M", available: true },
  { size: "L", available: true },
  { size: "XL", available: true },
  { size: "2XL", available: true },
  { size: "3XL", available: true },
]

const reviews = [
  {
    id: 1,
    rating: 5,
    title: "La camiseta es hermosa",
    content:
      "Los detalles dorados se ven increíbles y el material es muy cómodo. La compré para mi hermano y ahora quiero una para mí también.",
    author: "Mariana G.",
    helpful: 47,
    unhelpful: 2,
  },
  {
    id: 2,
    rating: 5,
    title: "No pensé que me fuera a emocionar tanto",
    content: "Se nota que es de colección. Me llegó en 4 días y todo perfecto. Muy feliz con la compra.",
    author: "Luis E.",
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 3,
    rating: 5,
    title: "Es justo como se ve en las fotos",
    content: "Ajusta bien, no es caliente y los colores se ven increíbles en persona. Mi esposo la amó.",
    author: "Carla M.",
    helpful: 23,
    unhelpful: 1,
  },
  {
    id: 4,
    rating: 5,
    title: "La calidad es de otro nivel",
    content:
      "Es ligera, se siente fresca y los detalles del escudo dorado están brutales. Me preguntan dónde la compré cada vez que la uso.",
    author: "Andrés H.",
    helpful: 89,
    unhelpful: 3,
  },
  {
    id: 5,
    rating: 5,
    title: "Llegó rápido y es 100% original",
    content:
      "La pedí con miedo de que tardara o fuera falsa, pero llegó rápido y es 100% original. Estoy muy satisfecha.",
    author: "Paola R.",
    helpful: 12,
    unhelpful: 0,
  },
  {
    id: 6,
    rating: 5,
    title: "Por fin algo que representa bien a México",
    content: "Me encantó todo: el diseño, el mensaje, la calidad. Gracias por hacer esto posible.",
    author: "Jorge A.",
    helpful: 156,
    unhelpful: 4,
  },
  {
    id: 7,
    rating: 5,
    title: "Me sorprendió lo rápido que llegó",
    content: "Lo bien que viene empacada. Es elegante y diferente a cualquier camiseta que tenga.",
    author: "Valeria D.",
    helpful: 8,
    unhelpful: 1,
  },
  {
    id: 8,
    rating: 5,
    title: "La camiseta sí es distinta",
    content: "Ligera, de alta gama y el escudo en dorado es precioso.",
    author: "Fernando Z.",
    helpful: 34,
    unhelpful: 0,
  },
  {
    id: 9,
    rating: 5,
    title: "Le regalé esta camiseta a mi novio",
    content: "Se emocionó muchísimo. Dice que es la mejor que ha tenido.",
    author: "Isabel T.",
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 10,
    rating: 5,
    title: "Orgullo puro cada vez que la uso",
    content: "No soy mucho de dejar reseñas, pero esta camiseta lo merece. ¡Arriba México!",
    author: "Mateo S.",
    helpful: 203,
    unhelpful: 7,
  },
  {
    id: 11,
    rating: 5,
    title: "Es elegante y representa bien a nuestro país",
    content: "La pedí con miedo, pero al abrir el paquete supe que valió la pena.",
    author: "Renata V.",
    helpful: 5,
    unhelpful: 0,
  },
  {
    id: 12,
    rating: 5,
    title: "Se siente profesional, como de jugador real",
    content: "He comprado muchas camisetas de fútbol, pero esta es otra cosa.",
    author: "Marco A.",
    helpful: 67,
    unhelpful: 2,
  },
  {
    id: 13,
    rating: 5,
    title: "Regalazo para mi hermano",
    content: "La reacción de él cuando la vio no tiene precio.",
    author: "Alejandra P.",
    helpful: 18,
    unhelpful: 0,
  },
  {
    id: 14,
    rating: 5,
    title: "Es original de verdad",
    content: "Es liviana, fresca y los acabados son muy finos. Nada que ver con copias baratas.",
    author: "Tomás C.",
    helpful: 91,
    unhelpful: 1,
  },
  {
    id: 15,
    rating: 5,
    title: "No me esperaba que brillara tanto el dorado",
    content: "Ya la lavé y sigue como nueva.",
    author: "Camila N.",
    helpful: 3,
    unhelpful: 0,
  },
  {
    id: 16,
    rating: 5,
    title: "La mejor edición que han sacado",
    content: "Me siento parte de la historia con esta camiseta. Gracias por hacerlo posible.",
    author: "Daniel L.",
    helpful: 124,
    unhelpful: 5,
  },
  {
    id: 17,
    rating: 5,
    title: "Fácil de pedir, rápido el envío",
    content: "La calidad es excelente. ¡Arriba la selección!",
    author: "Julieta M.",
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 18,
    rating: 5,
    title: "Me sorprendió el empaque y la atención",
    content: "Y ni hablar de la camiseta: de lujo. Se nota que es edición especial.",
    author: "Iván F.",
    helpful: 42,
    unhelpful: 1,
  },
  {
    id: 19,
    rating: 5,
    title: "La vi en un anuncio y no pude resistirme",
    content: "Cuando llegó, confirmé que había hecho bien. Es preciosa.",
    author: "Mónica A.",
    helpful: 15,
    unhelpful: 0,
  },
  {
    id: 20,
    rating: 5,
    title: "El diseño está brutal",
    content: "Me la llevé al estadio y varios me preguntaron dónde la conseguí.",
    author: "Sergio H.",
    helpful: 78,
    unhelpful: 2,
  },
  {
    id: 21,
    rating: 5,
    title: "No conocía esta tienda y me daba miedo",
    content: "Pero fue todo seguro. Llegó puntual y la camiseta es una joya.",
    author: "Liliana E.",
    helpful: 29,
    unhelpful: 0,
  },
  {
    id: 22,
    rating: 5,
    title: "El corte, el tejido, el dorado… todo está cuidado",
    content: "Se siente premium. Muy feliz con la compra.",
    author: "Ernesto G.",
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 23,
    rating: 5,
    title: "Me gusta porque no es solo bonita, también es cómoda",
    content: "Se ajusta bien y se ve elegante.",
    author: "Daniela S.",
    helpful: 36,
    unhelpful: 1,
  },
  {
    id: 24,
    rating: 5,
    title: "Perfecta. Ni una sola costura mal hecha",
    content: "Producto 100% original y de colección.",
    author: "Rafael O.",
    helpful: 183,
    unhelpful: 6,
  },
  {
    id: 25,
    rating: 5,
    title: "La compré para mi papá",
    content: "Me dijo que era la mejor camiseta de la selección que ha tenido. Muy agradecida.",
    author: "Fernanda R.",
    helpful: 7,
    unhelpful: 0,
  },
  {
    id: 26,
    rating: 5,
    title: "Cuando abrí el paquete, no lo podía creer",
    content: "El escudo dorado es increíble y la calidad se siente profesional.",
    author: "Esteban R.",
    helpful: 52,
    unhelpful: 0,
  },
  {
    id: 27,
    rating: 5,
    title: "Muy cómoda, no pica, no aprieta",
    content: "Y además se ve hermosa. Mi esposo quedó fascinado.",
    author: "Rosa C.",
    helpful: 21,
    unhelpful: 1,
  },
  {
    id: 28,
    rating: 5,
    title: "Es como tener una camiseta edición de jugador",
    content: "La textura, el corte, el diseño… todo 10/10.",
    author: "Alan V.",
    helpful: 95,
    unhelpful: 3,
  },
  {
    id: 29,
    rating: 5,
    title: "Fácil de pedir, envío rápido",
    content: "Llegó en excelente estado. Se siente como una prenda de lujo.",
    author: "Diana T.",
    helpful: 0,
    unhelpful: 0,
  },
  {
    id: 30,
    rating: 5,
    title: "No sabía qué esperar",
    content: "Pero me llevé una grata sorpresa. La mejor camiseta que tengo.",
    author: "Mateo I.",
    helpful: 14,
    unhelpful: 0,
  },
]

const ugcImages = [
  {
    id: 1,
    src: "https://photorankmedia-a.akamaihd.net/media/f/u/n/funqc/normal.jpg",
    alt: "Usuario usando jersey México",
  },
  {
    id: 2,
    src: "https://photorankmedia-a.akamaihd.net/media/k/x/b/kxbh/normal.jpg",
    alt: "Usuario usando jersey México",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=300&text=Instagram+Post",
    alt: "Post de Instagram",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=300&text=Instagram+Post",
    alt: "Post de Instagram",
  },
]

export default function ProductPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [personalizationType, setPersonalizationType] = useState("player")
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [customName, setCustomName] = useState("")
  const [customNumber, setCustomNumber] = useState("")
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [showReturnsModal, setShowReturnsModal] = useState(false)
  const [showGiftCardModal, setShowGiftCardModal] = useState(false)
  const [showUGCModal, setShowUGCModal] = useState(false)
  const [sizeGuideTab, setSizeGuideTab] = useState("cm")
  const [ugcCurrentSlide, setUgcCurrentSlide] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const nextUGCSlide = () => {
    setUgcCurrentSlide((prev) => (prev + 1) % ugcImages.length)
  }

  const prevUGCSlide = () => {
    setUgcCurrentSlide((prev) => (prev - 1 + ugcImages.length) % ugcImages.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const scrollToReviews = () => {
    const reviewsElement = document.querySelector('[value="reviews"]')
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: "smooth", block: "start" })
      // Open the reviews accordion if it's closed
      const reviewsAccordion = reviewsElement.querySelector('[data-state="closed"]')
      if (reviewsAccordion) {
        reviewsAccordion.click()
      }
    }
  }

  const scrollToProductGallery = () => {
    const galleryElement = document.querySelector(".aspect-square")
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full cursor-pointer" onClick={scrollToReviews}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202025-07-10%20a%CC%80s%2005.56.40-ZqIoyI8Oer0OO0EQQKa8j38vFDwIeJ.png"
          alt="Header Adidas - Jersey México"
          width={1200}
          height={300}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Breadcrumb */}
      <nav className="px-4 py-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <span>Inicio</span>
          <span>/</span>
          <span>Hombre</span>
          <span>/</span>
          <span>Ropa</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Product Gallery */}
        <div className="relative mb-6">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={productImages[currentImage] || "/placeholder.svg"}
              alt="Jersey tercero Selección Nacional de México 24/25"
              fill
              className="object-cover"
            />
            {/* Personalizable Badge - Left Side */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <div className="bg-white text-black px-3 py-6 text-xs font-bold tracking-wider transform -rotate-90 origin-center border border-gray-200 shadow-sm flex items-center justify-center min-w-[120px]">
                PERSONALIZABLE
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Image Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentImage ? "bg-black" : "bg-gray-300"}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Remove this entire div:
          <div>
            <h1 className="text-2xl font-bold mb-2">JERSEY TERCERO SELECCIÓN NACIONAL DE MÉXICO 24/25</h1>
            <p className="text-3xl font-bold">$2,799</p>
          </div> */}

          {/* Personalization */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Personalizar</h3>
              <p className="text-sm text-gray-600 mb-4">
                Añade un nombre o número para personalizar tu producto adidas o crear el regalo perfecto.
              </p>

              <RadioGroup value={personalizationType} onValueChange={setPersonalizationType} className="mb-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="player" id="player" />
                  <Label htmlFor="player">Elegir un jugador</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Añade el tuyo</Label>
                </div>
              </RadioGroup>

              {personalizationType === "player" ? (
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un jugador" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map((player) => (
                      <SelectItem key={player} value={player}>
                        {player}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <input
                      id="name"
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Ingresa el nombre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <input
                      id="number"
                      type="text"
                      value={customNumber}
                      onChange={(e) => setCustomNumber(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Ingresa el número"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Tallas</h3>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-sm p-0 h-auto underline hover:no-underline flex items-center"
              >
                <Info className="w-4 h-4 mr-1" />
                Guía de tallas
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {sizes.map(({ size, available }) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  disabled={!available}
                  onClick={() => available && setSelectedSize(size)}
                  className={`relative ${!available ? "opacity-50" : ""}`}
                >
                  {size}
                  {!available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-400 rotate-45" />
                    </div>
                  )}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Info className="w-4 h-4" />
              <span>
                <strong>Talla real.</strong> Te recomendamos pedir tu talla habitual.
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" disabled={!selectedSize}>
              {selectedSize ? "Agregar al carrito" : "Selecciona la talla"}
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="lg">
              <Heart className="w-4 h-4 mr-2" />
              Agregar a favoritos
            </Button>

            {/* Remove the "BUSCAR ALTERNATIVAS" button entirely */}
          </div>

          {/* Delivery & Benefits */}
          <div className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-black" />
                <button onClick={() => setShowShippingModal(true)} className="underline hover:no-underline text-left">
                  ENVÍOS GRATIS A PARTIR DE MXN $1,299
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-black" />
                <button onClick={() => setShowReturnsModal(true)} className="underline hover:no-underline text-left">
                  DEVOLUCIONES GRATIS
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-black" />
                <button onClick={() => setShowGiftCardModal(true)} className="underline hover:no-underline text-left">
                  ENVIO GRATIS PARA TARJETAS DE REGALO
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reviews">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-2">
                  <span>Valoraciones (80)</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">4.9</span>
                    <div className="flex">{renderStars(5)}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.9</div>
                      <div className="flex justify-center">{renderStars(5)}</div>
                    </div>
                    <Button variant="outline">Escribir una reseña</Button>
                  </div>

                  {/* Rating Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Comodidad</span>
                        <span>Excelente</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Calidad</span>
                        <span>Excelente</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Ajuste</span>
                        <span>Perfecto</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>

                  <Separator />

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{review.author}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>¿Útil?</span>
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {review.helpful}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              {review.unhelpful}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {review.verified && (
                          <div className="flex items-center space-x-2 mt-2 text-sm text-green-600">
                            <span>✓ Comprador verificado</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Leer más reseñas
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="description">
              <AccordionTrigger>Descripción</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    Un jersey tercero de la SNM inspirado en los años dorados y creada para la cancha
                  </h3>
                  <p className="text-sm text-gray-600">
                    Este jersey adidas de México celebra los años dorados de la cultura y deporte en México diseñado con
                    detalles en negro y dorado está inspirado en el esplendor de la música y el arte mexicanos.
                    Confeccionada para garantizar un máximo rendimiento en el terreno de juego y un confort excepcional
                    fuera de él, incorpora la tecnología transpirable HEAT.RDY perfecto para salir a darlo todo en la
                    cancha.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Detalles</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li>• Ajuste ceñido</li>
                    <li>• Cuello redondo</li>
                    <li>• 100% poliéster (reciclado)</li>
                    <li>• HEAT.RDY</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Escudo de la Selección Nacional de México termotransferido</li>
                    <li>• Color del artículo: Black</li>
                    <li>• Número de artículo: JF2639</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care">
              <AccordionTrigger>Cuidados</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Instrucciones de lavado</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• No usar blanqueador</li>
                      <li>• No utilizar secadora</li>
                      <li>• No lavar en seco</li>
                      <li>• Planchar a temperatura baja</li>
                      <li>• Lavar a máquina en temperatura fría</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Información adicional sobre el cuidado</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Retirar inmediatamente</li>
                      <li>• Lavar y planchar al revés</li>
                      <li>• No usar suavizante</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ugc">
              <AccordionTrigger>Presume tu look</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    ¿Quieres aparecer en nuestra galería? simplemente menciona la cuenta de @adidasmx en tus fotos de
                    instagram y puede ser elegida para que aparezca aquí.
                  </p>

                  {/* UGC Carousel */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${ugcCurrentSlide * 100}%)` }}
                      >
                        {Array.from({ length: Math.ceil(ugcImages.length / 2) }, (_, slideIndex) => (
                          <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-4">
                            {ugcImages.slice(slideIndex * 2, slideIndex * 2 + 2).map((image) => (
                              <div
                                key={image.id}
                                className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer hover:opacity-90 transition-opacity"
                              >
                                <div className="absolute top-2 right-2 z-10">
                                  <Instagram className="w-5 h-5 text-white" />
                                </div>
                                <Image
                                  src={image.src || "/placeholder.svg"}
                                  alt={image.alt}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                  <button className="text-white text-sm underline hover:no-underline">
                                    Ver productos
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevUGCSlide}
                      className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md ${ugcCurrentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={ugcCurrentSlide === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={nextUGCSlide}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md ${ugcCurrentSlide === Math.ceil(ugcImages.length / 2) - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={ugcCurrentSlide === Math.ceil(ugcImages.length / 2) - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                      {Array.from({ length: Math.ceil(ugcImages.length / 2) }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => setUgcCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full ${index === ugcCurrentSlide ? "bg-black" : "bg-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Product Story Section */}
      <section className="w-full mt-8">
        <div className="relative">
          <picture>
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/statement_pdp_d_1_d_c27c5b17eb.jpg"
              media="(min-width: 960px)"
            />
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_960,w_960/statement_pdp_d_1_t_3ff12c5101.jpg"
              media="(min-width: 768px)"
            />
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_768,w_768/statement_pdp_d_1_m_9062845064.jpg"
              media="(max-width: 767px)"
            />
            <img
              src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/statement_pdp_d_1_d_c27c5b17eb.jpg"
              alt="México de Oro"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </picture>
        </div>

        <section className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">MÉXICO DE ORO</h2>
              <p className="text-lg">
                Sé protagonista de la nueva época dorada de México con adidas x Selección Nacional de México 24/25.
              </p>
            </div>
          </div>
        </section>

        <div className="relative">
          <picture>
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/mx_ss25_football_new_img_pdp_jugadores_d_fe711d7192.jpg"
              media="(min-width: 960px)"
            />
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_960,w_960/mx_ss25_football_new_img_pdp_jugadores_t_34b073496d.jpg"
              media="(min-width: 768px)"
            />
            <source
              srcSet="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_768,w_768/mx_ss25_football_new_img_pdp_jugadores_m_a29ea189f1.jpg"
              media="(max-width: 767px)"
            />
            <img
              src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/mx_ss25_football_new_img_pdp_jugadores_d_fe711d7192.jpg"
              alt="Jugadores México"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </picture>
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Guía de Tallas</h2>
                <button onClick={() => setShowSizeGuide(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b mb-4">
                <button
                  onClick={() => setSizeGuideTab("inches")}
                  className={`px-4 py-2 ${sizeGuideTab === "inches" ? "border-b-2 border-black font-semibold" : ""}`}
                >
                  Pulgadas
                </button>
                <button
                  onClick={() => setSizeGuideTab("cm")}
                  className={`px-4 py-2 ${sizeGuideTab === "cm" ? "border-b-2 border-black font-semibold" : ""}`}
                >
                  cm
                </button>
              </div>

              {/* Size Tables */}
              {sizeGuideTab === "inches" && (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Etiqueta del producto</th>
                        <th className="border border-gray-300 p-2">XS</th>
                        <th className="border border-gray-300 p-2">S</th>
                        <th className="border border-gray-300 p-2">M</th>
                        <th className="border border-gray-300 p-2">L</th>
                        <th className="border border-gray-300 p-2">XL</th>
                        <th className="border border-gray-300 p-2">2XL</th>
                        <th className="border border-gray-300 p-2">3XL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Pecho</th>
                        <td className="border border-gray-300 p-2">32 1/2 - 34"</td>
                        <td className="border border-gray-300 p-2">34 1/2 - 36"</td>
                        <td className="border border-gray-300 p-2">36 1/2 - 39"</td>
                        <td className="border border-gray-300 p-2">39 1/2 - 42 1/2"</td>
                        <td className="border border-gray-300 p-2">43 - 46 1/2"</td>
                        <td className="border border-gray-300 p-2">47" - 51"</td>
                        <td className="border border-gray-300 p-2">51 1/2 - 56"</td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Cintura</th>
                        <td className="border border-gray-300 p-2">27 1/2 - 29"</td>
                        <td className="border border-gray-300 p-2">29 1/2 - 31 1/2"</td>
                        <td className="border border-gray-300 p-2">32 - 34 1/2"</td>
                        <td className="border border-gray-300 p-2">35 - 38"</td>
                        <td className="border border-gray-300 p-2">38 1/2 - 42"</td>
                        <td className="border border-gray-300 p-2">42 1/2 - 47"</td>
                        <td className="border border-gray-300 p-2">47 1/2 - 52"</td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Cadera</th>
                        <td className="border border-gray-300 p-2">32 - 33 1/2"</td>
                        <td className="border border-gray-300 p-2">34 - 36"</td>
                        <td className="border border-gray-300 p-2">36 1/2 - 39"</td>
                        <td className="border border-gray-300 p-2">39 1/2 - 42"</td>
                        <td className="border border-gray-300 p-2">42 1/2 - 45 1/2"</td>
                        <td className="border border-gray-300 p-2">46 - 49"</td>
                        <td className="border border-gray-300 p-2">49 1/2 - 53"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {sizeGuideTab === "cm" && (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Etiqueta del producto</th>
                        <th className="border border-gray-300 p-2">XS</th>
                        <th className="border border-gray-300 p-2">S</th>
                        <th className="border border-gray-300 p-2">M</th>
                        <th className="border border-gray-300 p-2">L</th>
                        <th className="border border-gray-300 p-2">XL</th>
                        <th className="border border-gray-300 p-2">2XL</th>
                        <th className="border border-gray-300 p-2">3XL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Pecho</th>
                        <td className="border border-gray-300 p-2">83 - 86cm</td>
                        <td className="border border-gray-300 p-2">87 - 92cm</td>
                        <td className="border border-gray-300 p-2">93 - 100cm</td>
                        <td className="border border-gray-300 p-2">101 - 108cm</td>
                        <td className="border border-gray-300 p-2">109 - 118cm</td>
                        <td className="border border-gray-300 p-2">119 - 130cm</td>
                        <td className="border border-gray-300 p-2">131 - 142cm</td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Cintura</th>
                        <td className="border border-gray-300 p-2">71 - 74cm</td>
                        <td className="border border-gray-300 p-2">75 - 80cm</td>
                        <td className="border border-gray-300 p-2">81 - 88cm</td>
                        <td className="border border-gray-300 p-2">89 - 96cm</td>
                        <td className="border border-gray-300 p-2">97 - 106cm</td>
                        <td className="border border-gray-300 p-2">107 - 119cm</td>
                        <td className="border border-gray-300 p-2">120 - 132cm</td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2 text-left bg-gray-50">Cadera</th>
                        <td className="border border-gray-300 p-2">82 - 85cm</td>
                        <td className="border border-gray-300 p-2">86 - 91cm</td>
                        <td className="border border-gray-300 p-2">92 - 99cm</td>
                        <td className="border border-gray-300 p-2">100 - 107cm</td>
                        <td className="border border-gray-300 p-2">108 - 116cm</td>
                        <td className="border border-gray-300 p-2">117 - 125cm</td>
                        <td className="border border-gray-300 p-2">126 - 135cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6">Desliza horizontalmente para ver más opciones.</p>

              {/* How to Measure Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">CÓMO MEDIR</h3>
                <p className="mb-4">
                  Toma una cinta métrica, anota las medidas y compáralas con nuestra guía de tallas para encontrar la
                  talla adecuada.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-2">Sujeta la cinta métrica de forma horizontal para medir:</p>
                    <p className="mb-1">
                      <strong>1. Pecho</strong>, alrededor de la parte más ancha
                    </p>
                    <p className="mb-1">
                      <strong>2. Cintura</strong>, alrededor de la parte más estrecha
                    </p>
                    <p className="mb-4">
                      <strong>3. Cadera</strong>, alrededor de la parte más ancha, manteniendo los pies juntos
                    </p>

                    <p className="mb-2">Sujeta la cinta métrica de forma vertical para medir:</p>
                    <p className="mb-1">
                      <strong>4. Tiro de la entrepierna</strong>, desde la entrepierna hasta el piso
                    </p>
                    <p>
                      <strong>5. Altura</strong>, desde la parte superior de la cabeza hasta el piso, manteniendo una
                      postura recta
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="https://brand.assets.adidas.com/image/upload/Male_Image_tcm221_856197_c01a591caa.png"
                      alt="Guía de medidas"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Modal */}
      {showShippingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">ENVÍOS GRATIS A PARTIR DE MXN $1,299</h2>
                <button onClick={() => setShowShippingModal(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold">¿CUÁNTO TARDARÁ EN LLEGAR MI PEDIDO?</p>
                </div>
                <div>
                  <p className="font-bold">TIEMPOS REGULARES DE ENVIO</p>
                  <p>
                    Una vez que nuestro almacén termine la preparación de tu pedido recibirás un correo electrónico de
                    confirmación con tu guía de seguimiento, a partir de este momento adidas realizará la entrega en la
                    dirección registrada en la orden en un tiempo de 3 (tres) a 5 (cinco) días hábiles a través de
                    nuestros socios logísticos autorizados.
                  </p>
                </div>
                <div>
                  <p>
                    Si compraste una tarjeta de regalo, recuerda que el email deberá llegar en un lapso de 1 a 4 horas.
                    Si no lo recibes, contáctanos.
                  </p>
                </div>
                <div>
                  <p className="font-bold">ENTREGA RÁPIDA EN CDMX Y ESTADO DE MEXICO</p>
                  <p>
                    Si utilizaste nuestro Servicio Express recibirás en un máximo de 2 (dos) días hábiles a través de
                    nuestro socio logístico iVoy. Recuerda que este servicio únicamente se encuentra disponible para
                    determinados códigos postales de CDMX y Estado de México.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Returns Modal */}
      {showReturnsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">¿CÓMO PUEDO DEVOLVER MI PEDIDO?</h2>
                <button onClick={() => setShowReturnsModal(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <p>Las tarjetas de regalo no aplica para devolución</p>
                <p>
                  ¿Tu artículo no fue lo que esperabas? Devuelve tu pedido adidas sin costo alguno. Recuerda que tienes
                  30 días desde la fecha de recepción de tu pedido para cualquier cambio o devolución o cambio.
                </p>
                <div>
                  <p>
                    1. Inicia tu proceso de devolución comunicándote con nuestro equipo de Atención al Cliente o a
                    través de nuestro portal de autogestión.
                  </p>
                  <p>
                    2. Recibirás una guía de devolución que deberás imprimir para entregar los productos o solicitar una
                    recolecta en tu domicilio.
                  </p>
                  <p>
                    3. Asegúrate de los artículos se encuentren en su empaque original y de que los artículos de ropa o
                    calzado llevan las etiquetas originales adheridas.
                  </p>
                  <p>
                    4. Una vez que el pedido sea recibido en nuestro almacén, será validado y autorizado. Recibirás en
                    tu correo electrónico una notificación de que tu devolución fue exitosamente procesada.
                  </p>
                  <p>
                    5. A partir de este momento Servicio al Cliente podrá liberar tu nueva orden con el artículo a
                    cambiar o bien, iniciar tu proceso de reembolso.
                  </p>
                </div>
                <p>
                  <strong>NOTA: </strong>No aceptamos devoluciones de trajes de baño, calcetas o calcetines, ropa
                  interior, mascarillas, artículos personalizados y productos categoría "HYPE", tales como "YEEZY,
                  Gucci, Productos Edición Limitada, Tarjetas de regalo y Colaboraciones Especiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gift Card Modal */}
      {showGiftCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">ENVIO GRATIS PARA TARJETAS DE REGALO</h2>
                <button onClick={() => setShowGiftCardModal(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              <p>Recibirás el enlace de tu tarjeta de regalo electrónica por correo.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className="w-full mt-0 cursor-pointer" onClick={scrollToProductGallery}>
        <Image
          src="/images/footer-adidas.png"
          alt="Footer Adidas - Tu opinión cuenta"
          width={1200}
          height={800}
          className="w-full h-auto object-cover block"
          style={{ display: "block", margin: 0, padding: 0 }}
        />
      </div>
    </div>
  )
}
