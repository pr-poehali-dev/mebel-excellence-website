import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO     = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/4fbdc734-cd55-4959-bc96-decdf5ba6d28.jpg";
const IMG_KITCHEN  = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/14ea493e-e49f-404c-80d3-0c7a6a60bea8.jpg";
const IMG_TV       = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/b454306c-e04c-4c87-a02a-28b433697ef9.jpg";
const IMG_CLOSET   = "https://cdn.poehali.dev/projects/536856ce-13a3-4036-a8fd-fc9c3d456cbd/files/cc74e5d0-cf45-4d10-b241-fb8dcfd8e1e6.jpg";

const NAV = [
  { href: "#works",     label: "Работы" },
  { href: "#process",   label: "Процесс" },
  { href: "#materials", label: "Материалы" },
  { href: "#reviews",   label: "Отзывы" },
  { href: "#promo",     label: "Акции" },
  { href: "#contacts",  label: "Контакты" },
];

const WORKS = [
  { id: 1, cat: "wardrobe", title: "Гардеробная система",  mat: "ЛДСП + алюминий",     size: "3.6 × 2.4 м",   price: "от 85 000 ₽",  img: IMG_HERO },
  { id: 2, cat: "kitchen",  title: "Кухня без ручек",      mat: "МДФ эмаль + ламинат", size: "3.2 × 1.8 м",   price: "от 165 000 ₽", img: IMG_KITCHEN },
  { id: 3, cat: "living",   title: "ТВ-стенка с нишами",   mat: "МДФ + шпон ореха",    size: "3.0 × 2.2 м",   price: "от 120 000 ₽", img: IMG_TV },
  { id: 4, cat: "wardrobe", title: "Walk-in гардеробная",  mat: "ЛДСП белый матовый",  size: "Индивидуально",  price: "от 110 000 ₽", img: IMG_CLOSET },
  { id: 5, cat: "kitchen",  title: "Угловая кухня «Слим»", mat: "Акрил + МДФ",         size: "2.8 + 1.6 м",   price: "от 195 000 ₽", img: IMG_KITCHEN },
  { id: 6, cat: "living",   title: "Шкаф-купе «Линия»",    mat: "Стекло + алюминий",   size: "2.4 × 2.3 м",   price: "от 70 000 ₽",  img: IMG_HERO },
];

const FILTERS: Record<string, string> = {
  all: "Все", wardrobe: "Шкафы и гардеробные", kitchen: "Кухни", living: "Гостиные",
};

const STEPS = [
  { icon: "Ruler",        title: "Замер",        desc: "Бесплатно выезжаем и снимаем точные размеры" },
  { icon: "Monitor",      title: "3D-проект",     desc: "Визуализация за 2–3 дня с несколькими вариантами" },
  { icon: "FileCheck",    title: "Договор",       desc: "Фиксируем цену, сроки и все детали" },
  { icon: "Factory",      title: "Производство",  desc: "Изготовление на ЧПУ-оборудовании, без посредников" },
  { icon: "PackageCheck", title: "Монтаж",        desc: "Доставка и установка под ключ" },
];

const MATERIALS = [
  { icon: "Layers",    title: "ЛДСП Egger",          desc: "Немецкие плиты класса E1 — без вредных выбросов, 200+ декоров" },
  { icon: "Box",       title: "МДФ и эмаль",          desc: "Гладкие фасады без ручек, акрил и матовая эмаль до 3000+ цветов RAL" },
  { icon: "Maximize",  title: "Алюминиевый профиль",  desc: "Рамочные системы и раздвижные двери — строгий минимализм" },
  { icon: "Settings2", title: "Фурнитура Blum",       desc: "Австрийские петли и направляющие с гарантией 50 000 циклов" },
];

const REVIEWS = [
  { name: "Анна К.",     city: "Москва",      text: "Гардеробная во всю стену — точно по проекту, монтаж за один день. Сплошной восторг.", stars: 5 },
  { name: "Иван М.",     city: "Красногорск", text: "Кухня без ручек — то, что искал. Всё аккуратно, никаких зазоров. Рекомендую!", stars: 5 },
  { name: "Светлана Р.", city: "Мытищи",      text: "ТВ-стенка с подсветкой — получилось лучше, чем на рендере. Спасибо мастерам!", stars: 5 },
  { name: "Олег Д.",     city: "Химки",       text: "Шкаф-купе в спальню по нестандартным размерам. Сделали быстро и по хорошей цене.", stars: 5 },
];

const FAQS = [
  { q: "Сколько стоит выезд замерщика?",        a: "Бесплатно — по Москве и МО." },
  { q: "Какой срок изготовления?",               a: "От 2 недель. Кухня в среднем — 3–4 недели, шкафы — 2 недели." },
  { q: "Есть гарантия?",                         a: "3 года на изделия, 10 лет на фурнитуру Blum." },
  { q: "Работаете с нестандартными размерами?",  a: "Это наша специализация — любые проёмы и конфигурации." },
  { q: "Как оплатить?",                          a: "50% при подписании договора, 50% после монтажа. Карты и безнал." },
];

const PROMOS = [
  { tag: "Акция",  title: "−15% на первый заказ",     desc: "Для новых клиентов — скидка 15% на любую мебель",    till: "до 31 марта" },
  { tag: "Бонус",  title: "3D-проект бесплатно",       desc: "При заказе любого изделия — визуализация в подарок", till: "постоянно" },
  { tag: "Пакет",  title: "Кухня + гардеробная −20%", desc: "Закажите два изделия сразу — скидка 20% на оба",     till: "ограничено" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, vis };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
      className={`${vis ? "reveal" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [filter, setFilter]       = useState("all");
  const [faqOpen, setFaqOpen]     = useState<number | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]           = useState({ name: "", phone: "", comment: "" });

  const filtered = filter === "all" ? WORKS : WORKS.filter(w => w.cat === filter);

  return (
    <div className="min-h-screen bg-white text-brand-dark font-montserrat">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-brand-mid">
        <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand-dark">
            Мебелекс
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-0.5" />
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-brand-muted hover:text-brand-dark transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+74951234567" className="text-sm font-semibold text-brand-dark">+7 (495) 123-45-67</a>
            <a href="#contacts" className="bg-brand-orange text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Заказать замер
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-brand-dark">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-brand-mid px-5 py-4 flex flex-col gap-4">
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-brand-dark font-medium py-1 text-sm">{l.label}</a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)} className="bg-brand-orange text-white font-semibold py-3 rounded-lg text-center text-sm">
              Заказать замер
            </a>
          </div>
        )}
      </header>

      {/* MARQUEE */}
      <div className="fixed top-[60px] inset-x-0 z-40 bg-brand-orange text-white text-[11px] font-bold py-[6px] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">
              <span className="flex items-center gap-1.5"><span className="opacity-60">✦</span> Бесплатный замер по Москве и МО</span>
              <span className="flex items-center gap-1.5"><span className="opacity-60">✦</span> Производство без посредников</span>
              <span className="flex items-center gap-1.5"><span className="opacity-60">✦</span> Гарантия 3 года</span>
              <span className="flex items-center gap-1.5"><span className="opacity-60">✦</span> ЧПУ-точность до 0,1 мм</span>
              <span className="flex items-center gap-1.5"><span className="opacity-60">✦</span> Монтаж под ключ</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] pt-[88px] flex items-end overflow-hidden">
        <img src={IMG_HERO} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 pb-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Корпусная мебель на заказ
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              Мебель точно<br />
              <span className="text-brand-orange">под ваш</span> размер
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-lg leading-relaxed">
              Шкафы, кухни, ТВ-стенки и гардеробные — изготавливаем за 2–4 недели на собственном производстве.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contacts" className="bg-brand-orange text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-orange-600 transition-all hover:scale-[1.02]">
                Рассчитать стоимость
              </a>
              <a href="#works" className="bg-white/10 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                Смотреть работы
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15">
            {[["500+", "проектов"], ["14 лет", "на рынке"], ["2–4 нед.", "срок"], ["0 ₽", "замер"]].map(([n, l]) => (
              <div key={n}>
                <div className="text-white font-bold text-2xl">{n}</div>
                <div className="text-white/50 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-2">Портфолио</p>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Наши работы</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(FILTERS).map(([k, v]) => (
                  <button key={k} onClick={() => setFilter(k)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === k
                      ? "bg-brand-dark text-white"
                      : "bg-white text-brand-muted hover:text-brand-dark border border-brand-mid"}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((w, i) => (
              <Reveal key={w.id} delay={i * 80}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-brand-mid hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      {w.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-dark text-lg mb-1">{w.title}</h3>
                    <p className="text-brand-muted text-sm mb-3">{w.mat}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-brand-muted text-xs">
                        <Icon name="Maximize2" size={12} />
                        <span>{w.size}</span>
                      </div>
                      <a href="#contacts" className="text-brand-orange text-xs font-semibold hover:underline flex items-center gap-1">
                        Хочу такой же <Icon name="ArrowRight" size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-3">Как мы работаем</p>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">5 шагов до готовой мебели</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative group">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-full h-px bg-brand-mid" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-brand-gray flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors duration-300 relative z-10">
                      <Icon name={s.icon} size={22} className="text-brand-dark group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-brand-orange text-xs font-bold mb-1">0{i + 1}</div>
                    <h3 className="font-bold text-brand-dark mb-2 text-sm">{s.title}</h3>
                    <p className="text-brand-muted text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div>
                <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">Из чего делаем</p>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                  Материалы и<br />технологии
                </h2>
                <p className="text-brand-muted mb-10 leading-relaxed text-sm">
                  Только европейские плиты и австрийская фурнитура. Раскрой на ЧПУ с точностью 0,1 мм — каждый элемент подходит идеально.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {MATERIALS.map((m, i) => (
                    <div key={i} className="group flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-gray flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors duration-300">
                        <Icon name={m.icon} size={18} className="text-brand-dark group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-dark text-sm mb-1">{m.title}</h3>
                        <p className="text-brand-muted text-xs leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <img src={IMG_TV} alt="производство" className="w-full h-[500px] object-cover rounded-2xl" />
                <div className="absolute -bottom-5 -left-5 bg-brand-orange text-white rounded-xl p-5 shadow-xl">
                  <div className="text-2xl font-bold">ЧПУ</div>
                  <div className="text-xs text-white/80 mt-0.5">Точность 0,1 мм</div>
                </div>
                <div className="absolute -top-5 -right-5 bg-white border border-brand-mid rounded-xl p-4 shadow-xl">
                  <div className="text-2xl font-bold text-brand-dark">Blum</div>
                  <div className="text-xs text-brand-muted mt-0.5">Австрийская фурнитура</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-3">Отзывы</p>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Что говорят клиенты</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-brand-mid hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(r.stars)].map((_, j) => <span key={j} className="text-brand-orange text-base">★</span>)}
                  </div>
                  <p className="text-brand-dark text-sm leading-relaxed flex-1">«{r.text}»</p>
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-brand-mid">
                    <div className="w-9 h-9 rounded-lg bg-brand-gray flex items-center justify-center font-bold text-brand-dark text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-brand-dark">{r.name}</div>
                      <div className="text-brand-muted text-xs">{r.city}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-3">Акции</p>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Специальные предложения</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROMOS.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${i === 0
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-white border-brand-mid hover:border-brand-orange"}`}>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-lg mb-5 ${i === 0 ? "bg-white/20 text-white" : "bg-brand-gray text-brand-muted"}`}>
                    {p.tag}
                  </span>
                  <h3 className={`text-2xl font-bold mb-3 ${i === 0 ? "text-white" : "text-brand-dark"}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${i === 0 ? "text-white/80" : "text-brand-muted"}`}>{p.desc}</p>
                  <div className={`flex items-center gap-2 text-xs font-medium ${i === 0 ? "text-white/70" : "text-brand-muted"}`}>
                    <Icon name="Clock" size={13} />
                    {p.till}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-3">FAQ</p>
              <h2 className="text-4xl font-bold text-brand-dark">Частые вопросы</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white rounded-xl border border-brand-mid overflow-hidden">
                  <button className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    <span className="font-semibold text-brand-dark text-sm pr-4">{f.q}</span>
                    <Icon name={faqOpen === i ? "Minus" : "Plus"} size={16} className="text-brand-orange shrink-0" />
                  </button>
                  {faqOpen === i && (
                    <div className="px-6 pb-5 text-brand-muted text-sm leading-relaxed border-t border-brand-mid pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-3">Контакты</p>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Давайте обсудим проект</h2>
              <p className="text-brand-muted mt-3 text-sm">Ответим в течение 30 минут в рабочее время</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <Reveal className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">Заявка принята!</h3>
                  <p className="text-brand-muted text-sm">Перезвоним в течение 30 минут</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-brand-dark text-xs font-semibold uppercase tracking-wide block mb-2">Имя</label>
                      <input type="text" required placeholder="Иван Иванов"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-brand-mid rounded-xl px-4 py-3 text-brand-dark text-sm focus:outline-none focus:border-brand-orange transition-colors" />
                    </div>
                    <div>
                      <label className="text-brand-dark text-xs font-semibold uppercase tracking-wide block mb-2">Телефон</label>
                      <input type="tel" required placeholder="+7 (___) ___-__-__"
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-brand-mid rounded-xl px-4 py-3 text-brand-dark text-sm focus:outline-none focus:border-brand-orange transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-brand-dark text-xs font-semibold uppercase tracking-wide block mb-2">О проекте</label>
                    <textarea rows={4} placeholder="Кухня 3×4 м, ЛДСП, без ручек..."
                      value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full border border-brand-mid rounded-xl px-4 py-3 text-brand-dark text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-brand-orange text-white font-semibold py-4 rounded-xl hover:bg-orange-600 transition-colors text-sm">
                    Отправить заявку и получить расчёт
                  </button>
                  <p className="text-brand-muted text-xs text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              )}
            </Reveal>

            <Reveal delay={120} className="lg:col-span-2">
              <div className="space-y-4">
                {[
                  { icon: "Phone",  label: "Телефон",      value: "+7 (495) 123-45-67" },
                  { icon: "Mail",   label: "Email",         value: "info@mebelex.ru" },
                  { icon: "MapPin", label: "Адрес",         value: "Москва, ул. Производственная, 15" },
                  { icon: "Clock",  label: "Режим работы",  value: "Пн–Пт 9:00–19:00, Сб 10:00–17:00" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4 bg-brand-gray rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={17} className="text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-brand-muted text-xs mb-0.5">{c.label}</div>
                      <div className="text-brand-dark font-semibold text-sm">{c.value}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-brand-muted text-xs mb-3">Мы в соцсетях:</p>
                  <div className="flex gap-2">
                    {[
                      { icon: "MessageCircle", label: "Telegram" },
                      { icon: "Instagram",     label: "Instagram" },
                      { icon: "Youtube",       label: "YouTube" },
                    ].map(s => (
                      <a key={s.label} href="#"
                        className="w-10 h-10 rounded-xl bg-brand-gray flex items-center justify-center hover:bg-brand-orange group transition-colors duration-200">
                        <Icon name={s.icon} size={17} className="text-brand-muted group-hover:text-white transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-white py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-bold text-xl">
              Мебелекс
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/40">
              {NAV.map(l => <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>)}
            </div>
            <p className="text-white/30 text-xs">© 2026 Мебелекс. Все права защищены</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <a href="#contacts"
        className="fixed bottom-6 right-6 z-50 bg-brand-orange text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-orange-600 hover:scale-110 transition-all duration-200"
        title="Заказать замер">
        <Icon name="MessageSquare" size={22} />
      </a>
    </div>
  );
}