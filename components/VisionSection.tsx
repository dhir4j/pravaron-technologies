"use client";

export function VisionSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-subtle/10 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-orange mb-4">Operating Model</p>
          <h2 className="text-5xl lg:text-6xl font-bold text-ink mb-6">
            From Software to <span className="bg-gradient-to-r from-orange via-orange-light to-pink bg-clip-text text-transparent">Autonomous Systems</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            AI is no longer only an interface. It is becoming the operating layer that turns context into coordinated action.
          </p>
        </div>

        {/* Three Cards Side by Side with Connecting Lines */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-30" 
               style={{ top: '6rem' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Card 1 - Input */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-light to-orange rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-line hover:border-orange/30">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-subtle to-orange/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-orange">01</span>
                </div>
                <h3 className="text-2xl font-bold text-ink text-center mb-3">Input</h3>
                <p className="text-sm text-orange font-semibold text-center mb-4 uppercase tracking-wider">Classic Software</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-orange mt-1">→</span>
                    <span className="text-sm text-muted">Operators type and click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange mt-1">→</span>
                    <span className="text-sm text-muted">Software stores and displays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange mt-1">→</span>
                    <span className="text-sm text-muted">People decide every step</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 - Context */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange to-orange-dark rounded-3xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-orange via-orange-light to-orange-dark rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-white transform hover:scale-105">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">02</span>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-3">Context</h3>
                <p className="text-sm text-white/90 font-semibold text-center mb-4 uppercase tracking-wider">AI-Augmented</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-white/90 mt-1">→</span>
                    <span className="text-sm text-white/90">Signals read automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/90 mt-1">→</span>
                    <span className="text-sm text-white/90">State summarized for teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/90 mt-1">→</span>
                    <span className="text-sm text-white/90">Actions drafted for review</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 - Action */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-black to-navy-2 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-black to-navy-2 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-white transform hover:scale-105">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">03</span>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-3">Action</h3>
                <p className="text-sm text-white/80 font-semibold text-center mb-4 uppercase tracking-wider">Autonomous Agents</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-white/80 mt-1">→</span>
                    <span className="text-sm text-white/80">Goals broken into tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/80 mt-1">→</span>
                    <span className="text-sm text-white/80">Tools used directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/80 mt-1">→</span>
                    <span className="text-sm text-white/80">People review what matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/80 mt-1">→</span>
                    <span className="text-sm text-white/80">Outcomes reported back</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white border-2 border-orange rounded-full px-8 py-4 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-orange">Evolution Path</span>
              <span className="text-ink font-bold">Software → AI-augmented → Autonomous</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
