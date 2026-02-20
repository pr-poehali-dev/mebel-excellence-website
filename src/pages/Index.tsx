import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/87d90682-4025-4b15-bf74-1259adb134da.jpg";
const KITCHEN_IMAGE = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/43fb1263-5f9b-4507-b488-1213de518ecd.jpg";
const WORKSHOP_IMAGE = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/c9616f8c-0715-49e0-97f8-0916df633b5a.jpg";

const navLinks = [
  { href: "#works", label: "Наши работы" },
  { href: "#process", label: "Процесс заказа" },
  { href: "#materials", label: "Материалы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#promo", label: "Акции" },
  { href: "#contacts", label: "Контакты" },
];

const works = [
  { id: 1, category: "kitchen", title: "Кухня «Нордик»", desc: "Массив дуба, матовые фасады", size: "3.4 × 2.8 м", price: "от 180 000 ₽", img: KITCHEN_IMAGE },
  { id: 2, category: "wardrobe", title: "Гардероб «Модерн»", desc: "МДФ, эмаль, зеркальные вставки", size: "2.4 × 2.2 м", price: "от 95 000 ₽", img: HERO_IMAGE },
  { id: 3, category: "living", title: "Гостиная «Классика»", desc: "Шпон ореха, натуральная кожа", size: "Индивидуально", price: "от 220 000 ₽", img: WORKSHOP_IMAGE },
  { id: 4, category: "bedroom", title: "Спальня «Прованс»", desc: "МДФ, акриловые фасады, белый цвет", size: "Индивидуально", price: "от 140 000 ₽", img: KITCHEN_IMAGE },
  { id: 5, category: "kitchen", title: "Кухня «Лофт»", desc: "Металл и дерево, открытые полки", size: "2.8 × 1.9 м", price: "от 160 000 ₽", img: HERO_IMAGE },
  { id: 6, category: "wardrobe", title: "Шкаф-купе «Слим»", desc: "Зеркальные раздвижные двери", size: "2.0 × 2.4 м", price: "от 65 000 ₽", img: WORKSHOP_IMAGE },
];

const filterLabels: Record<string, string> = {
  all: "Все работы",
  kitchen: "Кухни",
  wardrobe: "Шкафы",
  living: "Гостиные",
  bedroom: "Спальни",
};

const steps = [
  { icon: "Ruler", num: "01", title: "Замер помещения", desc: "Наш специалист выезжает к вам бесплатно и снимает точные мерки" },
  { icon: "PenTool", num: "02", title: "Разработка проекта", desc: "3D-визуализация будущей мебели с учётом всех ваших пожеланий" },
  { icon: "CheckCircle", num: "03", title: "Согласование", desc: "Утверждаем материалы, цвет и финальную стоимость — никаких скрытых платежей" },
  { icon: "Hammer", num: "04", title: "Производство", desc: "Изготовление на собственном оборудовании, контроль качества на каждом этапе" },
  { icon: "Truck", num: "05", title: "Доставка и монтаж", desc: "Привозим и устанавливаем мебель под ключ, убираем за собой" },
];

const materials = [
  { icon: "Trees", title: "Массив дерева", desc: "Дуб, ясень, орех — натуральные породы высшего сорта с естественной текстурой" },
  { icon: "Layers", title: "МДФ и ЛДСП", desc: "Европейские производители Egger, Pfleiderer — экологически чистые плиты без формальдегида" },
  { icon: "Sparkles", title: "Фасады", desc: "Эмаль, шпон, акрил, матовое стекло — более 200 цветов и текстур в наличии" },
  { icon: "Settings", title: "Фурнитура", desc: "Blum, Hettich, Grass — немецкая и австрийская фурнитура с гарантией 10 лет" },
];

const reviews = [
  { name: "Анна Светлова", city: "Москва", text: "Заказывала кухню по индивидуальному проекту. Всё сделали точно в срок, качество превзошло ожидания. Уже 2 года — ни единого нарекания!", rating: 5 },
  { name: "Игорь Макаров", city: "Санкт-Петербург", text: "Гардеробная комната с нуля. Ребята помогли с планировкой, предложили решения которые я сам не додумался. Очень доволен!", rating: 5 },
  { name: "Марина Ковалёва", city: "Казань", text: "Шкаф-купе с зеркальными фасадами. Монтаж занял один день, всё аккуратно и профессионально. Рекомендую!", rating: 5 },
  { name: "Дмитрий Орлов", city: "Екатеринбург", text: "Гостиная из массива ореха — это произведение искусства. Соседи завидуют, жена в восторге. Мебелекс — лучшие!", rating: 5 },
];

const faqs = [
  { q: "Сколько времени занимает изготовление мебели?", a: "В зависимости от сложности проекта — от 2 до 6 недель. Кухни и спальни в среднем 3-4 недели." },
  { q: "Выезжаете в другие города?", a: "Да, работаем по всей России. Доставка и монтаж рассчитывается индивидуально." },
  { q: "Есть ли гарантия на мебель?", a: "Даём гарантию 3 года на все изделия и 10 лет на используемую фурнитуру Blum/Hettich." },
  { q: "Можно ли заказать мебель нестандартных размеров?", a: "Абсолютно! Мы специализируемся именно на индивидуальных размерах. Любые нестандартные проёмы и конфигурации." },
  { q: "Как происходит оплата?", a: "50% предоплата при подписании договора, 50% после приёмки работ. Принимаем карты и безналичный расчёт." },
];

const promos = [
  { badge: "Акция", title: "Кухня в подарок", desc: "При заказе гостиной от 200 000 ₽ — кухонный гарнитур со скидкой 30%", until: "до 1 апреля 2026" },
  { badge: "Новинка", title: "Бесплатный дизайн-проект", desc: "При заказе любой мебели — 3D-визуализация в подарок", until: "Постоянно" },
  { badge: "Скидка", title: "−15% для новых клиентов", desc: "Первый заказ — скидка 15% на весь комплект мебели", until: "Ограниченное предложение" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [calcData, setCalcData] = useState({ type: "kitchen", width: 3, height: 2.4, material: "ldsp" });

  const filteredWorks = activeFilter === "all" ? works : works.filter(w => w.category === activeFilter);

  const calcPrice = () => {
    const base: Record<string, number> = { kitchen: 45000, wardrobe: 28000, living: 55000, bedroom: 38000 };
    const mat: Record<string, number> = { ldsp: 1, mdf: 1.3, massiv: 2.1 };
    return Math.round(base[calcData.type] * calcData.width * calcData.height * mat[calcData.material] / 10) * 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream font-montserrat">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-warm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-semibold text-brand-text tracking-wide">
            Мебелекс
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-brand-muted hover:text-brand-gold transition-colors duration-200 font-medium">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contacts" className="hidden lg:inline-flex items-center gap-2 bg-brand-gold text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-amber-700 transition-colors duration-200">
            Получить консультацию
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-brand-text">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-brand-cream border-t border-brand-warm px-4 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-brand-text font-medium py-1">{l.label}</a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="bg-brand-gold text-white text-sm font-medium px-5 py-3 rounded-full text-center">
              Получить консультацию
            </a>
          </div>
        )}
      </header>

      {/* MARQUEE */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-brand-gold text-white text-xs font-medium py-1.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8">
              <span>✦ Бесплатный замер по Москве и МО</span>
              <span>✦ Гарантия 3 года на все изделия</span>
              <span>✦ Скидка 15% первым клиентам</span>
              <span>✦ 3D-проект в подарок при заказе</span>
              <span>✦ Производство от 2 недель</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="relative h-screen min-h-[600px] pt-24 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Мебелекс" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <p className="text-brand-gold text-sm font-semibold tracking-widest uppercase mb-4">Мебель по индивидуальным проектам</p>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-brand-text leading-tight mb-6">
              Создаём мебель,<br />
              <em className="font-normal text-brand-gold">которую любят</em>
            </h1>
            <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Каждое изделие создаётся с нуля под ваш проект, вкус и пространство. Работаем с 2010 года.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contacts" className="bg-brand-gold text-white font-medium px-7 py-3.5 rounded-full hover:bg-amber-700 transition-all duration-200 hover:scale-105">
                Заказать консультацию
              </a>
              <a href="#works" className="border border-brand-gold text-brand-gold font-medium px-7 py-3.5 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-200">
                Смотреть работы
              </a>
            </div>
            <div className="flex items-center gap-8 mt-10">
              {[["500+", "проектов"], ["14", "лет опыта"], ["3 года", "гарантия"]].map(([n, l]) => (
                <div key={n}>
                  <div className="font-cormorant text-3xl font-semibold text-brand-text">{n}</div>
                  <div className="text-brand-muted text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ADVANTAGES */}
      <Section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Medal", title: "Премиальные материалы", desc: "Используем только сертифицированное сырьё от европейских производителей" },
              { icon: "Fingerprint", title: "100% индивидуально", desc: "Каждый проект создаётся с нуля под ваши размеры, вкус и образ жизни" },
              { icon: "Clock", title: "Точно в срок", desc: "Соблюдаем договорные сроки и несём финансовую ответственность за их нарушение" },
            ].map(item => (
              <div key={item.title} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-full bg-brand-warm flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors duration-300">
                  <Icon name={item.icon} size={22} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-semibold text-brand-text mb-1">{item.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WORKS */}
      <Section id="works" className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Портфолио</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light mb-4">Наши работы</h2>
            <p className="text-brand-muted max-w-lg mx-auto">Более 500 реализованных проектов — от кухни до гардеробной</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {Object.entries(filterLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === key ? "bg-brand-gold text-white" : "bg-white text-brand-muted hover:text-brand-gold border border-brand-warm"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map(work => (
              <div key={work.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-gold text-xs font-semibold px-3 py-1 rounded-full">
                    {work.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-cormorant text-xl font-semibold text-brand-text mb-1">{work.title}</h3>
                  <p className="text-brand-muted text-sm mb-2">{work.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <Icon name="Maximize2" size={12} />
                    <span>{work.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Как мы работаем</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light mb-4">Процесс заказа</h2>
            <p className="text-brand-muted max-w-lg mx-auto">5 простых шагов от идеи до готовой мебели в вашем доме</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-brand-warm" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="relative w-16 h-16 rounded-full bg-brand-warm flex items-center justify-center mb-4 group-hover:bg-brand-gold transition-colors duration-300 z-10">
                    <Icon name={step.icon} size={26} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-xs rounded-full flex items-center justify-center font-semibold group-hover:bg-white group-hover:text-brand-gold transition-colors duration-300">{i + 1}</span>
                  </div>
                  <h3 className="font-cormorant text-lg font-semibold text-brand-text mb-2">{step.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CALCULATOR */}
      <Section className="py-20 bg-brand-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Онлайн-расчёт</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-brand-text font-light">Узнайте примерную стоимость</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-brand-text text-sm font-medium block mb-2">Тип мебели</label>
                <select
                  value={calcData.type}
                  onChange={e => setCalcData({ ...calcData, type: e.target.value })}
                  className="w-full border border-brand-warm rounded-xl px-4 py-3 text-brand-text bg-white focus:outline-none focus:border-brand-gold text-sm"
                >
                  <option value="kitchen">Кухня</option>
                  <option value="wardrobe">Шкаф / гардеробная</option>
                  <option value="living">Гостиная</option>
                  <option value="bedroom">Спальня</option>
                </select>
              </div>
              <div>
                <label className="text-brand-text text-sm font-medium block mb-2">Материал</label>
                <select
                  value={calcData.material}
                  onChange={e => setCalcData({ ...calcData, material: e.target.value })}
                  className="w-full border border-brand-warm rounded-xl px-4 py-3 text-brand-text bg-white focus:outline-none focus:border-brand-gold text-sm"
                >
                  <option value="ldsp">ЛДСП (эконом)</option>
                  <option value="mdf">МДФ (стандарт)</option>
                  <option value="massiv">Массив дерева (премиум)</option>
                </select>
              </div>
              <div>
                <label className="text-brand-text text-sm font-medium block mb-2">Ширина: {calcData.width} м</label>
                <input
                  type="range" min="1" max="6" step="0.1" value={calcData.width}
                  onChange={e => setCalcData({ ...calcData, width: +e.target.value })}
                  className="w-full accent-brand-gold"
                />
              </div>
              <div>
                <label className="text-brand-text text-sm font-medium block mb-2">Высота: {calcData.height} м</label>
                <input
                  type="range" min="1.5" max="3" step="0.1" value={calcData.height}
                  onChange={e => setCalcData({ ...calcData, height: +e.target.value })}
                  className="w-full accent-brand-gold"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-brand-cream rounded-2xl p-6">
              <div>
                <p className="text-brand-muted text-sm mb-1">Примерная стоимость</p>
                <p className="font-cormorant text-4xl font-semibold text-brand-gold">{calcPrice().toLocaleString("ru-RU")} ₽</p>
                <p className="text-brand-muted text-xs mt-1">* Точная цена после замера</p>
              </div>
              <a href="#contacts" className="bg-brand-gold text-white font-medium px-8 py-3.5 rounded-full hover:bg-amber-700 transition-colors duration-200 whitespace-nowrap">
                Получить точный расчёт
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* MATERIALS */}
      <Section id="materials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-4">Качество без компромиссов</p>
              <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light mb-6 leading-tight">
                Материалы и<br />технологии
              </h2>
              <p className="text-brand-muted leading-relaxed mb-8">
                Работаем только с проверенными поставщиками и используем современное оборудование с ЧПУ для точного изготовления каждой детали.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {materials.map(m => (
                  <div key={m.title} className="group">
                    <div className="w-10 h-10 rounded-xl bg-brand-warm flex items-center justify-center mb-3 group-hover:bg-brand-gold transition-colors duration-300">
                      <Icon name={m.icon} size={20} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-cormorant text-lg font-semibold text-brand-text mb-1">{m.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={WORKSHOP_IMAGE} alt="Производство" className="w-full h-[500px] object-cover rounded-3xl" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-lg">
                <div className="font-cormorant text-3xl font-semibold text-brand-gold">ЧПУ</div>
                <div className="text-brand-muted text-xs mt-1">Точность до 0,1 мм</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Отзывы</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light mb-4">Клиенты о нас</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <span key={j} className="text-brand-gold text-sm">★</span>)}
                </div>
                <p className="text-brand-text text-sm leading-relaxed mb-5 italic">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-warm flex items-center justify-center font-cormorant text-brand-gold font-semibold text-lg">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-brand-text text-sm font-semibold">{r.name}</div>
                    <div className="text-brand-muted text-xs">{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROMO */}
      <Section id="promo" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Специальные предложения</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light">Акции и новинки</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promos.map((p, i) => (
              <div key={i} className="border border-brand-warm rounded-2xl p-7 hover:border-brand-gold transition-colors duration-300 group">
                <span className="inline-block bg-brand-warm text-brand-gold text-xs font-semibold px-3 py-1 rounded-full mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                  {p.badge}
                </span>
                <h3 className="font-cormorant text-2xl font-semibold text-brand-text mb-2">{p.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-center gap-2 text-brand-muted text-xs">
                  <Icon name="Calendar" size={13} />
                  <span>{p.until}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-cormorant text-lg font-semibold text-brand-text pr-4">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-brand-gold shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-brand-muted text-sm leading-relaxed border-t border-brand-warm pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">Свяжитесь с нами</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-brand-text font-light mb-4">Контакты</h2>
            <p className="text-brand-muted">Ответим в течение 30 минут в рабочее время</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold text-brand-text mb-2">Спасибо за обращение!</h3>
                  <p className="text-brand-muted">Наш менеджер свяжется с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-brand-text text-sm font-medium block mb-2">Ваше имя</label>
                    <input
                      type="text" required placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-brand-warm rounded-xl px-4 py-3 text-brand-text bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-brand-text text-sm font-medium block mb-2">Телефон</label>
                    <input
                      type="tel" required placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-brand-warm rounded-xl px-4 py-3 text-brand-text bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-brand-text text-sm font-medium block mb-2">Расскажите о проекте</label>
                    <textarea
                      rows={4} placeholder="Кухня 3×4 м, стиль современный, бюджет ~200 000 ₽..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-brand-warm rounded-xl px-4 py-3 text-brand-text bg-white focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-brand-gold text-white font-medium py-4 rounded-full hover:bg-amber-700 transition-colors duration-200">
                    Отправить заявку
                  </button>
                  <p className="text-brand-muted text-xs text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              )}
            </div>
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@mebelex.ru" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Производственная, 15, стр. 2" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–19:00, Сб: 10:00–17:00" },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-brand-muted text-xs mb-0.5">{c.label}</div>
                    <div className="text-brand-text font-medium text-sm">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-brand-warm">
                <p className="text-brand-muted text-sm mb-4">Мы в социальных сетях:</p>
                <div className="flex gap-3">
                  {[
                    { icon: "MessageCircle", label: "Telegram" },
                    { icon: "Instagram", label: "Instagram" },
                    { icon: "Youtube", label: "YouTube" },
                  ].map(s => (
                    <a key={s.label} href="#" className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center hover:bg-brand-gold group transition-colors duration-200">
                      <Icon name={s.icon} size={18} className="text-brand-gold group-hover:text-white transition-colors duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-brand-text text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-cormorant text-2xl font-semibold mb-1">Мебелекс</div>
              <div className="text-white/50 text-xs">Мебель по индивидуальным проектам</div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>)}
            </div>
            <div className="text-white/40 text-xs">© 2026 Мебелекс. Все права защищены</div>
          </div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <a
        href="#contacts"
        className="fixed bottom-6 right-6 z-50 bg-brand-gold text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 hover:scale-110 transition-all duration-200"
        title="Заказать консультацию"
      >
        <Icon name="MessageSquare" size={22} />
      </a>
    </div>
  );
}
