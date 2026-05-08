import { motion } from "motion/react";
import {
  Check,
  Users,
  DollarSign,
  Cloud,
  TrendingUp,
  Activity,
  Smartphone,
  Globe,
  Zap,
  Link2,
  BarChart3,
  Shield,
  ChevronRight,
  MapPin,
  Mail,
} from "lucide-react";

// Component for the complete landing page in one language
function LandingPage({
  language,
  hero,
  trustBar,
  problemSolution,
  modules,
  howItWorks,
  pricing,
  network,
  finalCta,
  footer
}: any) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#faf8f3] via-white to-[#f5f5f5] pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiA2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnoiIHN0cm9rZT0iIzJkNGEyYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl lg:text-7xl tracking-tight mb-6" style={{ color: '#1e3320' }}>
              {hero.headline}
            </h1>
            <p className="text-xl lg:text-2xl text-[#8b8b8b] mb-10 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="px-8 py-4 rounded-lg text-white transition-all hover:shadow-xl" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                {hero.ctaPrimary}
              </button>
              <button className="px-8 py-4 border-2 rounded-lg transition-all hover:bg-[#faf8f3]" style={{ borderColor: '#2d4a2b', color: '#2d4a2b' }}>
                {hero.ctaSecondary}
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
                <div className="p-12 text-white">
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2 opacity-80" />
                      <div className="text-sm opacity-60">{hero.activeHorses}</div>
                      <div className="text-3xl mt-1">247</div>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-80" />
                      <div className="text-sm opacity-60">{hero.monthlyRevenue}</div>
                      <div className="text-3xl mt-1">$142K</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                      <div className="text-sm opacity-60">{hero.clients}</div>
                      <div className="text-3xl mt-1">89</div>
                    </div>
                  </div>
                  <div className="h-px bg-white opacity-20 mb-6"></div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="opacity-60 mb-1">{hero.nextSession}</div>
                      <div>Thunderbolt - 14:30</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="opacity-60 mb-1">{hero.pendingInvoices}</div>
                      <div>{hero.invoicesReady}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-b border-gray-200" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm tracking-wide mb-6" style={{ color: '#8b8b8b' }}>
            {trustBar}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <Shield className="w-12 h-12" style={{ color: '#2d4a2b' }} />
            <Globe className="w-12 h-12" style={{ color: '#2d4a2b' }} />
            <Activity className="w-12 h-12" style={{ color: '#2d4a2b' }} />
            <BarChart3 className="w-12 h-12" style={{ color: '#2d4a2b' }} />
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ color: '#1e3320' }}>
              {problemSolution.title}
            </h2>
            <p className="text-xl text-[#8b8b8b] max-w-2xl mx-auto">
              {problemSolution.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-2xl p-8 border border-red-100"
            >
              <h3 className="text-2xl mb-6 text-red-900">{problemSolution.oldWay}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">Equicity</span>
                  <span className="text-red-600">$50/mo</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">{problemSolution.accounting}</span>
                  <span className="text-red-600">$30/mo</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">Dropbox</span>
                  <span className="text-red-600">$20/mo</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">Hootsuite</span>
                  <span className="text-red-600">$30/mo</span>
                </div>
                <div className="border-t-2 border-red-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{problemSolution.total}</span>
                    <span className="text-2xl text-red-600">$130/mo</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-8 border-2" style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #ffffff 100%)', borderColor: '#2d4a2b' }}
            >
              <h3 className="text-2xl mb-6" style={{ color: '#1e3320' }}>{problemSolution.newWay}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span className="text-gray-700">Stable & Horse Management</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span className="text-gray-700">Automated Billing</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span className="text-gray-700">Unlimited Media Storage</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span className="text-gray-700">Social Media & SEO</span>
                </div>
                <div className="border-t-2 pt-4" style={{ borderColor: '#2d4a2b' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{problemSolution.oneplatform}</span>
                    <span className="text-2xl" style={{ color: '#2d4a2b' }}>$49-499/mo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-24" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ color: '#1e3320' }}>
              {modules.title}
            </h2>
            <p className="text-xl text-[#8b8b8b] max-w-2xl mx-auto">
              {modules.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-4" style={{ color: '#1e3320' }}>
                {modules.module1.title}
              </h3>
              <p className="text-[#8b8b8b] leading-relaxed">
                {modules.module1.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-4" style={{ color: '#1e3320' }}>
                {modules.module2.title}
              </h3>
              <p className="text-[#8b8b8b] leading-relaxed">
                {modules.module2.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
                <Cloud className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-4" style={{ color: '#1e3320' }}>
                {modules.module3.title}
              </h3>
              <p className="text-[#8b8b8b] leading-relaxed">
                {modules.module3.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-4" style={{ color: '#1e3320' }}>
                {modules.module4.title}
              </h3>
              <p className="text-[#8b8b8b] leading-relaxed">
                {modules.module4.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ color: '#1e3320' }}>
              {howItWorks.title}
            </h2>
            <p className="text-xl text-[#8b8b8b] max-w-2xl mx-auto">
              {howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: howItWorks.step1.title,
                  description: howItWorks.step1.description,
                  icon: Link2,
                },
                {
                  step: "2",
                  title: howItWorks.step2.title,
                  description: howItWorks.step2.description,
                  icon: Smartphone,
                },
                {
                  step: "3",
                  title: howItWorks.step3.title,
                  description: howItWorks.step3.description,
                  icon: Zap,
                },
                {
                  step: "4",
                  title: howItWorks.step4.title,
                  description: howItWorks.step4.description,
                  icon: TrendingUp,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl" style={{ background: index % 2 === 0 ? 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' : 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                    {item.step}
                  </div>
                  <div className="flex-1 bg-[#faf8f3] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-6 h-6" style={{ color: '#2d4a2b' }} />
                      <h3 className="text-2xl" style={{ color: '#1e3320' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#8b8b8b]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24" style={{ background: '#faf8f3' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ color: '#1e3320' }}>
              {pricing.title}
            </h2>
            <p className="text-xl text-[#8b8b8b] max-w-2xl mx-auto">
              {pricing.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl mb-2" style={{ color: '#1e3320' }}>
                {pricing.basic.name}
              </h3>
              <div className="mb-6">
                <span className="text-5xl" style={{ color: '#2d4a2b' }}>{pricing.basic.price}</span>
                <span className="text-[#8b8b8b]">/mo</span>
              </div>
              <p className="text-sm text-[#8b8b8b] mb-6">{pricing.basic.target}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.basic.feature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.basic.feature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.basic.feature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.basic.feature4}</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-lg border-2 transition-all hover:bg-[#faf8f3]" style={{ borderColor: '#2d4a2b', color: '#2d4a2b' }}>
                {pricing.basic.cta}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-2xl border-2 relative" style={{ borderColor: '#b8860b' }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs text-white" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                {pricing.premium.badge}
              </div>
              <h3 className="text-2xl mb-2" style={{ color: '#1e3320' }}>
                {pricing.premium.name}
              </h3>
              <div className="mb-6">
                <span className="text-5xl" style={{ color: '#b8860b' }}>{pricing.premium.price}</span>
                <span className="text-[#8b8b8b]">/mo</span>
              </div>
              <p className="text-sm text-[#8b8b8b] mb-6">{pricing.premium.target}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
                  <span className="text-sm">{pricing.premium.feature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
                  <span className="text-sm">{pricing.premium.feature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
                  <span className="text-sm">{pricing.premium.feature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
                  <span className="text-sm">{pricing.premium.feature4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#b8860b' }} />
                  <span className="text-sm">{pricing.premium.feature5}</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-lg text-white transition-all hover:shadow-xl" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                {pricing.premium.cta}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl mb-2" style={{ color: '#1e3320' }}>
                {pricing.ultra.name}
              </h3>
              <div className="mb-6">
                <span className="text-5xl" style={{ color: '#2d4a2b' }}>{pricing.ultra.price}</span>
                <span className="text-[#8b8b8b]">/mo</span>
              </div>
              <p className="text-sm text-[#8b8b8b] mb-6">{pricing.ultra.target}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.ultra.feature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.ultra.feature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.ultra.feature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.ultra.feature4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2d4a2b' }} />
                  <span className="text-sm">{pricing.ultra.feature5}</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-lg border-2 transition-all hover:bg-[#faf8f3]" style={{ borderColor: '#2d4a2b', color: '#2d4a2b' }}>
                {pricing.ultra.cta}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-xl p-8"
          >
            <h4 className="text-xl mb-4 text-center" style={{ color: '#1e3320' }}>
              {pricing.alacarte}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#faf8f3' }}>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span>{pricing.financial}</span>
                </div>
                <span style={{ color: '#2d4a2b' }}>$39/mo</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: '#faf8f3' }}>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" style={{ color: '#2d4a2b' }} />
                  <span>{pricing.marketing}</span>
                </div>
                <span style={{ color: '#2d4a2b' }}>$59/mo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ color: '#1e3320' }}>
              {network.title}
            </h2>
            <p className="text-xl text-[#8b8b8b] max-w-2xl mx-auto">
              {network.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#faf8f3] rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#1e3320' }}>
                Joep & Tom
              </h3>
              <p className="text-sm text-[#8b8b8b] mb-3">{network.founders}</p>
              <p className="text-sm text-[#8b8b8b]">
                {network.foundersDesc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#faf8f3] rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#1e3320' }}>
                Heather
              </h3>
              <p className="text-sm text-[#8b8b8b] mb-3">{network.usLead}</p>
              <p className="text-sm text-[#8b8b8b]">
                {network.usLeadDesc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#faf8f3] rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#1e3320' }}>
                Kyara
              </h3>
              <p className="text-sm text-[#8b8b8b] mb-3">{network.euLead}</p>
              <p className="text-sm text-[#8b8b8b]">
                {network.euLeadDesc}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-[#8b8b8b] mb-4">
              {network.betaNote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiA2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnoiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl text-white mb-6">
              {finalCta.title}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {finalCta.subtitle}
            </p>
            <button className="px-10 py-5 rounded-lg text-white transition-all hover:shadow-2xl inline-flex items-center gap-2 text-lg" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
              {finalCta.cta}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1e3320] text-white/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Equiviesa
              </h3>
              <p className="text-sm">
                {footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="text-white mb-3">{footer.product}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{footer.features}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{footer.pricing}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{footer.demo}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">{footer.company}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{footer.about}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{footer.team}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{footer.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">{footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{footer.privacy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{footer.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">{footer.rights}</p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@equiviesa.com" className="hover:text-white transition-colors">
                info@equiviesa.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const dutchContent = {
    hero: {
      headline: "The Global Equestrian Ecosystem.",
      subheadline: "Vervang gefragmenteerde tools door het meest complete, schaalbare alles-in-één platform voor moderne stallen. Van dagelijks beheer tot geautomatiseerde facturatie en marketing.",
      ctaPrimary: "Request VIP Beta Access",
      ctaSecondary: "Bekijk de Platform Demo",
      activeHorses: "Actieve Paarden",
      monthlyRevenue: "Maandelijkse Omzet",
      clients: "Klanten",
      nextSession: "Volgende Trainingssessie",
      pendingInvoices: "Openstaande Facturen",
      invoicesReady: "12 klaar om te versturen",
    },
    trustBar: "VERTROUWD DOOR ELITE FACILITEITEN IN CALIFORNIË, WELLINGTON EN EUROPA",
    problemSolution: {
      title: "Van Chaos Naar Controle",
      subtitle: "Stop met betalen voor meerdere gefragmenteerde systemen",
      oldWay: "De Oude Manier",
      newWay: "De Equiviesa Manier",
      accounting: "Boekhouding",
      total: "Totaal + Frustratie",
      oneplatform: "Eén Platform, Alles Inbegrepen",
    },
    modules: {
      title: "Alles Wat Je Stal Nodig Heeft",
      subtitle: "Vier krachtige modules die naadloos samenwerken",
      module1: {
        title: "Stable & Horse Management",
        description: "Digitaal gezondheidsdossier, interactieve stalborden en taakdelegatie voor grooms via de mobiele app.",
      },
      module2: {
        title: "IoT Tracker & Billing Engine",
        description: "API-koppeling met wearables. Automatische facturatie: paard in de stapmolen = automatische toevoeging op de maandfactuur via Stripe.",
      },
      module3: {
        title: "Equine Media Vault",
        description: "Ongelimiteerde cloudopslag voor 4K trainingsvideo's, auto-tagging op paardnaam, en geïntegreerde watermerken.",
      },
      module4: {
        title: "Social CMS & SEO Tools",
        description: "Plan en publiceer direct naar Instagram/Facebook en domineer zoekmachines met onze geautomatiseerde lokale SEO.",
      },
    },
    howItWorks: {
      title: "Hoe Het Werkt",
      subtitle: "Van setup tot groei in vier eenvoudige stappen",
      step1: {
        title: "Connect",
        description: "Koppel je bestaande data, stalpersoneel en IoT-trackers.",
      },
      step2: {
        title: "Manage",
        description: "Beheer de gezondheid, planning en trainingen vanuit je broekzak.",
      },
      step3: {
        title: "Automate",
        description: "Laat de software automatisch facturen genereren op basis van fysieke stalactiviteiten.",
      },
      step4: {
        title: "Grow",
        description: "Trek nieuwe eigenaren aan via krachtige, ingebouwde social media en SEO-tools.",
      },
    },
    pricing: {
      title: "Schaalbare Prijzen voor Elke Stal",
      subtitle: "Kies het plan dat past bij jouw ambities",
      basic: {
        name: "Basic Plan",
        price: "$49",
        target: "Kleine stallen",
        feature1: "Tot 10 paarden",
        feature2: "Handmatige facturatie",
        feature3: "50 GB Media Vault",
        feature4: "Basis support",
        cta: "Start Basic",
      },
      premium: {
        name: "Premium Plan",
        price: "$149",
        target: "Prof. sport/livery",
        feature1: "Tot 40 paarden",
        feature2: "Geautomatiseerde facturatie",
        feature3: "500 GB Media Vault",
        feature4: "1 Linked Social Account",
        feature5: "Priority support",
        cta: "Start Premium",
        badge: "MEEST POPULAIR",
      },
      ultra: {
        name: "Ultra Plan",
        price: "$499",
        target: "Grote faciliteiten",
        feature1: "Ongelimiteerd paarden",
        feature2: "Auto + IoT Sync facturatie",
        feature3: "Ongelimiteerde Media Vault",
        feature4: "Onbeperkt + SEO Pro",
        feature5: "Dedicated account manager",
        cta: "Start Ultra",
      },
      alacarte: "À la Carte Opties",
      financial: "Financial Module",
      marketing: "Marketing Module",
    },
    network: {
      title: "Gebouwd Door Experts, Uitgerold Wereldwijd",
      subtitle: "Ons elite netwerk brengt Equiviesa naar de beste faciliteiten wereldwijd",
      founders: "Tech Founders",
      foundersDesc: "Software architecten met ervaring in SaaS en IoT-integratie",
      usLead: "US Network Lead",
      usLeadDesc: "California & Wellington elite faciliteiten specialist",
      euLead: "EU Network Lead",
      euLeadDesc: "Europees circuit specialist voor premium stallen",
      betaNote: "VIP Beta plaatsen zijn gelimiteerd. Sluit je aan bij het exclusieve netwerk.",
    },
    finalCta: {
      title: "Join the Future of Stable Management",
      subtitle: "De plaatsen voor onze VIP Beta zijn gelimiteerd. Meld je stal vandaag nog aan.",
      cta: "Claim Your Invite",
    },
    footer: {
      tagline: "The Global Equestrian Ecosystem",
      product: "Product",
      features: "Features",
      pricing: "Prijzen",
      demo: "Demo",
      company: "Company",
      about: "About",
      team: "Team",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "© 2026 Equiviesa. Alle rechten voorbehouden.",
    },
  };

  const spanishContent = {
    hero: {
      headline: "El Ecosistema Ecuestre Global.",
      subheadline: "Reemplaza herramientas fragmentadas con la plataforma todo-en-uno más completa y escalable para cuadras modernas. Desde gestión diaria hasta facturación automatizada y marketing.",
      ctaPrimary: "Solicitar Acceso VIP Beta",
      ctaSecondary: "Ver Demo de Plataforma",
      activeHorses: "Caballos Activos",
      monthlyRevenue: "Ingresos Mensuales",
      clients: "Clientes",
      nextSession: "Próxima Sesión de Entrenamiento",
      pendingInvoices: "Facturas Pendientes",
      invoicesReady: "12 listas para enviar",
    },
    trustBar: "CONFIADO POR INSTALACIONES DE ÉLITE EN CALIFORNIA, WELLINGTON Y EUROPA",
    problemSolution: {
      title: "Del Caos Al Control",
      subtitle: "Deja de pagar por múltiples sistemas fragmentados",
      oldWay: "La Forma Antigua",
      newWay: "La Forma Equiviesa",
      accounting: "Contabilidad",
      total: "Total + Frustración",
      oneplatform: "Una Plataforma, Todo Incluido",
    },
    modules: {
      title: "Todo Lo Que Tu Cuadra Necesita",
      subtitle: "Cuatro módulos potentes que funcionan perfectamente juntos",
      module1: {
        title: "Gestión de Cuadra y Caballos",
        description: "Historial médico digital, tableros interactivos de cuadra y delegación de tareas para mozos vía app móvil.",
      },
      module2: {
        title: "Rastreador IoT y Motor de Facturación",
        description: "Integración API con wearables. Facturación automática: caballo en el caminador = adición automática a la factura mensual vía Stripe.",
      },
      module3: {
        title: "Bóveda de Medios Equinos",
        description: "Almacenamiento en la nube ilimitado para videos de entrenamiento 4K, etiquetado automático por nombre de caballo y marcas de agua integradas.",
      },
      module4: {
        title: "CMS Social y Herramientas SEO",
        description: "Planifica y publica directamente en Instagram/Facebook y domina los motores de búsqueda con nuestro SEO local automatizado.",
      },
    },
    howItWorks: {
      title: "Cómo Funciona",
      subtitle: "De la configuración al crecimiento en cuatro pasos simples",
      step1: {
        title: "Conectar",
        description: "Conecta tus datos existentes, personal de cuadra y rastreadores IoT.",
      },
      step2: {
        title: "Gestionar",
        description: "Gestiona la salud, planificación y entrenamientos desde tu bolsillo.",
      },
      step3: {
        title: "Automatizar",
        description: "Deja que el software genere facturas automáticamente basadas en actividades físicas de la cuadra.",
      },
      step4: {
        title: "Crecer",
        description: "Atrae nuevos propietarios a través de poderosas herramientas integradas de redes sociales y SEO.",
      },
    },
    pricing: {
      title: "Precios Escalables para Cada Cuadra",
      subtitle: "Elige el plan que se ajuste a tus ambiciones",
      basic: {
        name: "Plan Básico",
        price: "$49",
        target: "Cuadras pequeñas",
        feature1: "Hasta 10 caballos",
        feature2: "Facturación manual",
        feature3: "50 GB Media Vault",
        feature4: "Soporte básico",
        cta: "Comenzar Básico",
      },
      premium: {
        name: "Plan Premium",
        price: "$149",
        target: "Deporte profesional/pupilaje",
        feature1: "Hasta 40 caballos",
        feature2: "Facturación automatizada",
        feature3: "500 GB Media Vault",
        feature4: "1 Cuenta Social Vinculada",
        feature5: "Soporte prioritario",
        cta: "Comenzar Premium",
        badge: "MÁS POPULAR",
      },
      ultra: {
        name: "Plan Ultra",
        price: "$499",
        target: "Instalaciones grandes",
        feature1: "Caballos ilimitados",
        feature2: "Facturación Auto + IoT Sync",
        feature3: "Media Vault ilimitado",
        feature4: "Ilimitado + SEO Pro",
        feature5: "Gerente de cuenta dedicado",
        cta: "Comenzar Ultra",
      },
      alacarte: "Opciones À la Carte",
      financial: "Módulo Financiero",
      marketing: "Módulo de Marketing",
    },
    network: {
      title: "Construido Por Expertos, Desplegado Globalmente",
      subtitle: "Nuestra red de élite lleva Equiviesa a las mejores instalaciones del mundo",
      founders: "Fundadores Tech",
      foundersDesc: "Arquitectos de software con experiencia en SaaS e integración IoT",
      usLead: "Líder de Red EE.UU.",
      usLeadDesc: "Especialista en instalaciones de élite de California y Wellington",
      euLead: "Líder de Red EU",
      euLeadDesc: "Especialista del circuito europeo para cuadras premium",
      betaNote: "Los lugares VIP Beta son limitados. Únete a la red exclusiva.",
    },
    finalCta: {
      title: "Únete al Futuro de la Gestión de Cuadras",
      subtitle: "Los lugares VIP Beta son limitados. Registra tu cuadra hoy.",
      cta: "Reclama Tu Invitación",
    },
    footer: {
      tagline: "El Ecosistema Ecuestre Global",
      product: "Producto",
      features: "Características",
      pricing: "Precios",
      demo: "Demo",
      company: "Compañía",
      about: "Acerca de",
      team: "Equipo",
      contact: "Contacto",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      rights: "© 2026 Equiviesa. Todos los derechos reservados.",
    },
  };

  const englishContent = {
    hero: {
      headline: "The Global Equestrian Ecosystem.",
      subheadline: "Replace fragmented tools with the most complete, scalable all-in-one platform for modern stables. From daily management to automated billing and marketing.",
      ctaPrimary: "Request VIP Beta Access",
      ctaSecondary: "View Platform Demo",
      activeHorses: "Active Horses",
      monthlyRevenue: "Monthly Revenue",
      clients: "Clients",
      nextSession: "Next Training Session",
      pendingInvoices: "Pending Invoices",
      invoicesReady: "12 ready to send",
    },
    trustBar: "TRUSTED BY ELITE FACILITIES ACROSS CALIFORNIA, WELLINGTON, AND EUROPE",
    problemSolution: {
      title: "From Chaos To Control",
      subtitle: "Stop paying for multiple fragmented systems",
      oldWay: "The Old Way",
      newWay: "The Equiviesa Way",
      accounting: "Accounting",
      total: "Total + Frustration",
      oneplatform: "One Platform, Everything Included",
    },
    modules: {
      title: "Everything Your Stable Needs",
      subtitle: "Four powerful modules that work seamlessly together",
      module1: {
        title: "Stable & Horse Management",
        description: "Digital health records, interactive stable boards, and task delegation for grooms via mobile app.",
      },
      module2: {
        title: "IoT Tracker & Billing Engine",
        description: "API integration with wearables. Automatic billing: horse on the walker = automatic addition to monthly invoice via Stripe.",
      },
      module3: {
        title: "Equine Media Vault",
        description: "Unlimited cloud storage for 4K training videos, auto-tagging by horse name, and integrated watermarks.",
      },
      module4: {
        title: "Social CMS & SEO Tools",
        description: "Plan and publish directly to Instagram/Facebook and dominate search engines with our automated local SEO.",
      },
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "From setup to growth in four simple steps",
      step1: {
        title: "Connect",
        description: "Connect your existing data, stable staff, and IoT trackers.",
      },
      step2: {
        title: "Manage",
        description: "Manage health, scheduling, and training from your pocket.",
      },
      step3: {
        title: "Automate",
        description: "Let the software automatically generate invoices based on physical stable activities.",
      },
      step4: {
        title: "Grow",
        description: "Attract new owners through powerful, built-in social media and SEO tools.",
      },
    },
    pricing: {
      title: "Scalable Pricing for Every Stable",
      subtitle: "Choose the plan that fits your ambitions",
      basic: {
        name: "Basic Plan",
        price: "$49",
        target: "Small stables",
        feature1: "Up to 10 horses",
        feature2: "Manual billing",
        feature3: "50 GB Media Vault",
        feature4: "Basic support",
        cta: "Start Basic",
      },
      premium: {
        name: "Premium Plan",
        price: "$149",
        target: "Professional sport/livery",
        feature1: "Up to 40 horses",
        feature2: "Automated billing",
        feature3: "500 GB Media Vault",
        feature4: "1 Linked Social Account",
        feature5: "Priority support",
        cta: "Start Premium",
        badge: "MOST POPULAR",
      },
      ultra: {
        name: "Ultra Plan",
        price: "$499",
        target: "Large facilities",
        feature1: "Unlimited horses",
        feature2: "Auto + IoT Sync billing",
        feature3: "Unlimited Media Vault",
        feature4: "Unlimited + SEO Pro",
        feature5: "Dedicated account manager",
        cta: "Start Ultra",
      },
      alacarte: "À la Carte Options",
      financial: "Financial Module",
      marketing: "Marketing Module",
    },
    network: {
      title: "Built By Experts, Deployed Globally",
      subtitle: "Our elite network brings Equiviesa to the world's best facilities",
      founders: "Tech Founders",
      foundersDesc: "Software architects with expertise in SaaS and IoT integration",
      usLead: "US Network Lead",
      usLeadDesc: "California & Wellington elite facilities specialist",
      euLead: "EU Network Lead",
      euLeadDesc: "European circuit specialist for premium stables",
      betaNote: "VIP Beta spots are limited. Join the exclusive network.",
    },
    finalCta: {
      title: "Join the Future of Stable Management",
      subtitle: "VIP Beta spots are limited. Register your stable today.",
      cta: "Claim Your Invite",
    },
    footer: {
      tagline: "The Global Equestrian Ecosystem",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      company: "Company",
      about: "About",
      team: "Team",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "© 2026 Equiviesa. All rights reserved.",
    },
  };

  return (
    <div>
      {/* Dutch Version */}
      <div className="relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 border-2" style={{ borderColor: '#2d4a2b' }}>
            <span className="text-lg" style={{ color: '#2d4a2b', fontFamily: 'Playfair Display, Georgia, serif' }}>
              Nederlands
            </span>
          </div>
        </div>
        <LandingPage {...dutchContent} language="nl" />
      </div>

      {/* Divider */}
      <div className="relative h-32" style={{ background: 'linear-gradient(135deg, #2d4a2b 0%, #1e3320 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-64 bg-white/20"></div>
        </div>
      </div>

      {/* Spanish Version */}
      <div className="relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 border-2" style={{ borderColor: '#b8860b' }}>
            <span className="text-lg" style={{ color: '#b8860b', fontFamily: 'Playfair Display, Georgia, serif' }}>
              Español
            </span>
          </div>
        </div>
        <LandingPage {...spanishContent} language="es" />
      </div>

      {/* Divider */}
      <div className="relative h-32" style={{ background: 'linear-gradient(135deg, #b8860b 0%, #c87533 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-64 bg-white/20"></div>
        </div>
      </div>

      {/* English Version */}
      <div className="relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 border-2" style={{ borderColor: '#2d4a2b' }}>
            <span className="text-lg" style={{ color: '#2d4a2b', fontFamily: 'Playfair Display, Georgia, serif' }}>
              English
            </span>
          </div>
        </div>
        <LandingPage {...englishContent} language="en" />
      </div>
    </div>
  );
}
