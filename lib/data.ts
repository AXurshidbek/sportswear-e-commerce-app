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
    name: "Real Madrid erkaklar formasi (Jersi)",
    price: 580_000,
    originalPrice: 720_000,
    image: "https://shop.realmadrid.com/cdn/shop/files/image_5_6c1e66e4-f72a-49a8-819c-1c13ef555e1b.webp?v=1767820849",
    images: ["https://shop.realmadrid.com/cdn/shop/files/image_4_d76cf7a1-fdf5-4404-9c43-91b59aebed87.webp?v=1767820848&width=2000", "https://shop.realmadrid.com/cdn/shop/files/image_4_d76cf7a1-fdf5-4404-9c43-91b59aebed87.webp?v=1767820848&width=2000", "https://i.pinimg.com/736x/11/81/fb/1181fb239378d259071b0756b54d8b18.jpg"],
    category: "men",
    subcategory: "shoes",
    brand: "SPORTX",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Oq", hex: "#ffffff" },
      { name: "Qizil", hex: "#ef4444" },
    ],
    rating: 4.8,
    reviews: 234,
    description:
      "Pro Running Shoes X1 bilan tengsiz natijalarga erishing. Eng yaxshisini talab qiladigan professional yuguruvchilar uchun moʻljallangan.",
    features: ["Yengil toʻrsimon yuqori qism", "Harakatga tez moslashuvchan yumshatgich", "Chidamli rezina tashqi taglik", "Havo oʻtkazuvchi dizayn"],
    inStock: true,
    tags: ["yugurish", "samoradorlik", "bestseller"],
  },
  {
    id: "2",
    name: "Elite sport futbolkasi",
    price: 95_000,
    image: "/black-athletic-training-tshirt.jpg",
    images: ["/black-training-tee-front.jpg", "/black-training-tee-back.jpg"],
    category: "men",
    subcategory: "tops",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Toʻq koʻk", hex: "#1e3a5f" },
      { name: "Kulrang", hex: "#6b7280" },
    ],
    rating: 4.6,
    reviews: 156,
    description: "Elite sport futbolkamiz bilan intensiv mashgʻulotlar paytida salqinlik va qulaylikni his qiling.",
    features: ["Namlikni shimuvchi mato", "Toʻrt tomonga choʻziluvchan", "Yomon hidlarga qarshi texnologiya", "Yassi choklar (ishqalanmaydigan)"],
    inStock: true,
    tags: ["mashg'ulot", "fitnes", "asosiy"],
  },
  {
    id: "3",
    name: "Barcelona ayollar formasi (Jersi)",
    price: 420_000,
    originalPrice: 520_000,
    image: "https://static.nike.com/a/images/t_default/44312532-66cf-4240-968f-bc146b384924/FCB+WNK+DF+STAD+JSY+SS+HM.png",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSQTxmHNSq2FS95L9jY7VZ2P2oyl9R5AlWw&s", "https://store.fcbarcelona.com/cdn/shop/files/FE70420026_1.jpg?v=1763655188&width=1200"],
    category: "women",
    subcategory: "bottoms",
    brand: "SPORTX",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Toʻq siyohrang", hex: "#7c3aed" },
      { name: "Yashil-koʻk", hex: "#14b8a6" },
    ],
    rating: 4.9,
    reviews: 412,
    description: "Har qanday mashgʻulot uchun ajoyib choʻziluvchanlik va qoʻllab-quvvatlashga ega yuqori sifatli leggings (losinalar).",
    features: ["Baland belli dizayn", "Yashirin choʻntak", "Mashgʻulotga chidamli (shaffof boʻlmagan)", "Kompression moslashuv"],
    inStock: true,
    tags: ["yoga", "fitnes", "bestseller"],
  },
  {
    id: "4",
    name: "Krossfit mashgʻulot shortilari",
    price: 165_000,
    image: "/mens-athletic-training-shorts-black.jpg",
    images: ["/training-shorts-front.jpg", "/training-shorts-back.jpg"],
    category: "men",
    subcategory: "bottoms",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Kulrang", hex: "#6b7280" },
    ],
    rating: 4.7,
    reviews: 89,
    description: "Maksimal harakatchanlik va chidamlilik bilan intensiv krossfit mashgʻulotlari uchun maxsus yaratilgan.",
    features: ["Tez quriydigan mato", "Ichki astarli", "Mustahkamlangan choklar", "Chuqur choʻntaklar"],
    inStock: true,
    tags: ["krossfit", "mashg'ulot", "samoradorlik"],
  },
  {
    id: "5",
    name: "Ayollar Pro sport brayi (Top)",
    price: 135_000,
    image: "/womens-black-sports-bra-athletic.jpg",
    images: ["/sports-bra-front.jpg"],
    category: "women",
    subcategory: "tops",
    brand: "SPORTX",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Oq", hex: "#ffffff" },
      { name: "Pushti", hex: "#ec4899" },
    ],
    rating: 4.8,
    reviews: 278,
    description: "Yuqori faollikdagi harakatlar uchun maksimal darajada qoʻllab-quvvatlovchi sport brayi.",
    features: ["Yuqori darajadagi himoya", "Sozlanuvchan tasmalar", "Namlikni shimuvchi", "Olinadigan yostiqchalar"],
    inStock: true,
    tags: ["sport brayi", "yugurish", "fitnes"],
  },
  {
    id: "6",
    name: "Bolalar uchun yugurish krossovkalari",
    price: 285_000,
    originalPrice: 340_000,
    image: "https://i5.walmartimages.com/seo/Rgdypko-Kid-s-Running-Sneaker-School-Athletic-Walking-Shoes-For-Children-Kids-Tennis-Lightweight-Kid-School-Shoes_c42c9526-6cc5-42a8-bd37-85a4ec71cdd6.aac806db324261030e69ee386b91b600.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    images: ["https://i5.walmartimages.com/asr/57c83105-b59a-4f5d-81f8-77ce474ef26e.491c75baddecba85adaba6ae81c96c58.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/bf83a58e-5d2e-4630-94bb-86363e51356c.f08c9c47ae4301dc0e8619d3f0b45b76.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF"],
    category: "kids",
    subcategory: "shoes",
    brand: "SPORTX Junior",
    sizes: ["1", "2", "3", "4", "5", "6"],
    colors: [
      { name: "Koʻk/Yashil", hex: "#3b82f6" },
      { name: "Pushti/Siyohrang", hex: "#ec4899" },
    ],
    rating: 4.5,
    reviews: 67,
    description: "Harakatchan bolalar uchun moʻljallangan yengil va chidamli krossovkalar.",
    features: ["Qulay yopishqoq tasmalar (Velkro)", "Yumshoq taglik", "Polni chizmaydigan tashqi qism", "Havo oʻtkazuvchi toʻr"],
    inStock: true,
    tags: ["bolalar", "yugurish", "maktab uchun"],
  },
  {
    id: "7",
    name: "Hajmli sport sumkasi",
    price: 210_000,
    image: "https://cornellperformance.net/wp-content/uploads/2024/07/all-over-print-gym-bag-white-left-front-668d808494949-700x700.jpg",
    images: ["https://cornellperformance.net/wp-content/uploads/2024/07/all-over-print-gym-bag-white-right-front-668d808496653.jpg", "https://cornellperformance.net/wp-content/uploads/2024/07/all-over-print-gym-bag-white-left-front-668d808494949-700x700.jpg"],
    category: "accessories",
    subcategory: "bags",
    brand: "SPORTX",
    sizes: ["One Size"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Toʻq koʻk", hex: "#1e3a5f" },
    ],
    rating: 4.6,
    reviews: 143,
    description: "Barcha jihozlaringiz uchun maxsus boʻlinmalarga ega keng sport sumkasi.",
    features: ["Poyabzal uchun alohida boʻlinma", "Suv oʻtkazmaydigan mato", "Yumshoq yelkama-elka tasma", "Koʻp sonli choʻntaklar"],
    inStock: true,
    tags: ["fitnes", "sayohat", "asosiy"],
  },
  {
    id: "8",
    name: "Kompression paypoqlar (3 juft)",
    price: 85_000,
    image: "https://oldbonestherapy.com/cdn/shop/files/OBT_CompressionSocks_Red_Blue_Pink.jpg?v=1767732437",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuzDaGgbQ4ltspt-3-pmHI2UPS2yXEPocOMg&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyLaei6NNX5NJ3fapkD2LUG-HSLQTMJd4mQ&s"],
    category: "accessories",
    subcategory: "socks",
    brand: "SPORTX",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Qora", hex: "#1a1a1a" },
      { name: "Oq", hex: "#ffffff" },
    ],
    rating: 4.4,
    reviews: 98,
    description: "Qon aylanishini va charchoqdan tiklanishni yaxshilash uchun moʻljallangan maxsus kompression paypoqlar.",
    features: ["Oyoq kaftini qoʻllab-quvvatlash", "Yumshoq poshnali qism", "Choksiz burun qismi", "Namlik nazorati"],
    inStock: true,
    tags: ["yugurish", "tiklanish", "asosiy"],
  },
]

export const categories = [
  { id: "men", name: "Erkaklar", image: "https://i.guim.co.uk/img/media/e5a60fe02429db588fdd910fcfa259b9c78b4e60/0_73_3313_1988/master/3313.jpg?width=620&dpr=2&s=none&crop=none" },
  { id: "women", name: "Ayollar", image: "https://lancedelas.pt/wp-content/uploads/2025/09/1000135038.jpg?w=1440" },
  { id: "kids", name: "Bolalar", image: "https://m.media-amazon.com/images/I/71IJPqcYHhL._AC_UY350_.jpg" },
  { id: "accessories", name: "Aksessuarlar", image: "https://img.freepik.com/free-photo/football-equipment-grass_23-2147833422.jpg" },
]

export const brands = ["SPORTX", "SPORTX Junior", "Nike", "Adidas", "Under Armour", "Puma"]

export const promotions = [
  {
    id: "1",
    title: "",
    subtitle: "",
    description: "",
    image: "https://d1a9qnv764bsoo.cloudfront.net/stores/001/413/168/rte/bannercomputador.jpg",
    cta: "Xarid qilish",
    link: "/products?tag=sale",
  },
  {
    id: "2",
    title: "",
    subtitle: "",
    description: "Samoradorlik va uslub uygʻunligi",
    image: "https://d2r9epyceweg5n.cloudfront.net/stores/002/255/556/rte/Prancheta2.3.jpg",
    cta: "Koʻrish",
    link: "/products?tag=new",
  },
]