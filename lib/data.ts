export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  subcategory: string
  brand: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  rating: number
  reviews: number
  description: string
  features: string[]
  inStock: boolean
  tags: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Real Madrid men's jersey",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://shop.realmadrid.com/cdn/shop/files/image_5_6c1e66e4-f72a-49a8-819c-1c13ef555e1b.webp?v=1767820849",
    images: ["https://shop.realmadrid.com/cdn/shop/files/image_4_d76cf7a1-fdf5-4404-9c43-91b59aebed87.webp?v=1767820848&width=2000", "https://shop.realmadrid.com/cdn/shop/files/image_4_d76cf7a1-fdf5-4404-9c43-91b59aebed87.webp?v=1767820848&width=2000", "https://i.pinimg.com/736x/11/81/fb/1181fb239378d259071b0756b54d8b18.jpg"],
    category: "men",
    subcategory: "shoes",
    brand: "SPORTX",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Red", hex: "#ef4444" },
    ],
    rating: 4.8,
    reviews: 234,
    description:
      "Experience unmatched performance with our Pro Running Shoes X1. Designed for serious runners who demand the best.",
    features: ["Lightweight mesh upper", "Responsive cushioning", "Durable rubber outsole", "Breathable design"],
    inStock: true,
    tags: ["running", "performance", "bestseller"],
  },
  {
    id: "2",
    name: "Elite Training Tee",
    price: 45.0,
    image: "/black-athletic-training-tshirt.jpg",
    images: ["/black-training-tee-front.jpg", "/black-training-tee-back.jpg"],
    category: "men",
    subcategory: "tops",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Gray", hex: "#6b7280" },
    ],
    rating: 4.6,
    reviews: 156,
    description: "Stay cool and comfortable during intense workouts with our Elite Training Tee.",
    features: ["Moisture-wicking fabric", "Four-way stretch", "Anti-odor technology", "Flatlock seams"],
    inStock: true,
    tags: ["training", "gym", "essential"],
  },
  {
    id: "3",
    name: "Barcelona women's jersey",
    price: 68.0,
    originalPrice: 85.0,
    image: "https://static.nike.com/a/images/t_default/44312532-66cf-4240-968f-bc146b384924/FCB+WNK+DF+STAD+JSY+SS+HM.png",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSQTxmHNSq2FS95L9jY7VZ2P2oyl9R5AlWw&s", "https://store.fcbarcelona.com/cdn/shop/files/FE70420026_1.jpg?v=1763655188&width=1200"],
    category: "women",
    subcategory: "bottoms",
    brand: "SPORTX",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Purple", hex: "#7c3aed" },
      { name: "Teal", hex: "#14b8a6" },
    ],
    rating: 4.9,
    reviews: 412,
    description: "High-performance leggings with superior stretch and support for any workout.",
    features: ["High-waisted design", "Hidden pocket", "Squat-proof", "Compression fit"],
    inStock: true,
    tags: ["yoga", "gym", "bestseller"],
  },
  {
    id: "4",
    name: "CrossFit Training Shorts",
    price: 55.0,
    image: "/mens-athletic-training-shorts-black.jpg",
    images: ["/training-shorts-front.jpg", "/training-shorts-back.jpg"],
    category: "men",
    subcategory: "bottoms",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Gray", hex: "#6b7280" },
    ],
    rating: 4.7,
    reviews: 89,
    description: "Built for intense CrossFit workouts with maximum mobility and durability.",
    features: ["Quick-dry fabric", "Built-in liner", "Reinforced seams", "Deep pockets"],
    inStock: true,
    tags: ["crossfit", "training", "performance"],
  },
  {
    id: "5",
    name: "Women's Sports Bra Pro",
    price: 48.0,
    image: "/womens-black-sports-bra-athletic.jpg",
    images: ["/sports-bra-front.jpg", "/placeholder.svg?height=600&width=600"],
    category: "women",
    subcategory: "tops",
    brand: "SPORTX",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Pink", hex: "#ec4899" },
    ],
    rating: 4.8,
    reviews: 278,
    description: "Maximum support sports bra for high-impact activities.",
    features: ["High support", "Adjustable straps", "Moisture-wicking", "Removable pads"],
    inStock: true,
    tags: ["sports bra", "running", "gym"],
  },
  {
    id: "6",
    name: "Kids Running Sneakers",
    price: 65.0,
    originalPrice: 75.0,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "kids",
    subcategory: "shoes",
    brand: "SPORTX Junior",
    sizes: ["1", "2", "3", "4", "5", "6"],
    colors: [
      { name: "Blue/Green", hex: "#3b82f6" },
      { name: "Pink/Purple", hex: "#ec4899" },
    ],
    rating: 4.5,
    reviews: 67,
    description: "Lightweight and durable sneakers designed for active kids.",
    features: ["Easy velcro closure", "Cushioned sole", "Non-marking outsole", "Breathable mesh"],
    inStock: true,
    tags: ["kids", "running", "school"],
  },
  {
    id: "7",
    name: "Performance Gym Bag",
    price: 75.0,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "accessories",
    subcategory: "bags",
    brand: "SPORTX",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    rating: 4.6,
    reviews: 143,
    description: "Spacious gym bag with dedicated compartments for all your gear.",
    features: ["Shoe compartment", "Water-resistant", "Padded strap", "Multiple pockets"],
    inStock: true,
    tags: ["gym", "travel", "essential"],
  },
  {
    id: "8",
    name: "Compression Socks 3-Pack",
    price: 32.0,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "accessories",
    subcategory: "socks",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
    ],
    rating: 4.4,
    reviews: 98,
    description: "Graduated compression socks for improved circulation and recovery.",
    features: ["Arch support", "Cushioned heel", "Seamless toe", "Moisture control"],
    inStock: true,
    tags: ["running", "recovery", "essential"],
  },
]

export const categories = [
  { id: "men", name: "Men", image: "https://i.guim.co.uk/img/media/e5a60fe02429db588fdd910fcfa259b9c78b4e60/0_73_3313_1988/master/3313.jpg?width=620&dpr=2&s=none&crop=none" },
  { id: "women", name: "Women", image: "https://lancedelas.pt/wp-content/uploads/2025/09/1000135038.jpg?w=1440" },
  { id: "kids", name: "Kids", image: "https://m.media-amazon.com/images/I/71IJPqcYHhL._AC_UY350_.jpg" },
  { id: "accessories", name: "Accessories", image: "https://img.freepik.com/free-photo/football-equipment-grass_23-2147833422.jpg" },
]

export const brands = ["SPORTX", "SPORTX Junior", "Nike", "Adidas", "Under Armour", "Puma"]

export const promotions = [
  {
    id: "1",
    title: "",
    subtitle: "",
    description: "",
    image: "https://d1a9qnv764bsoo.cloudfront.net/stores/001/413/168/rte/bannercomputador.jpg",
    cta: "Shop Now",
    link: "/products?tag=sale",
  },
  {
    id: "2",
    title: "",
    subtitle: "",
    description: "Performance meets style",
    image: "https://d2r9epyceweg5n.cloudfront.net/stores/002/255/556/rte/Prancheta2.3.jpg",
    cta: "Explore",
    link: "/products?tag=new",
  },
]
