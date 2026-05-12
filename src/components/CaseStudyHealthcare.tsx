import SEO from './SEO';

const CaseStudyHealthcare: React.FC = () => {
  return (
    <section className="min-h-screen px-6 py-24 max-w-4xl mx-auto text-slate-200">
      <SEO
        title="Healthcare App Case Study | Amit Sarode"
        description="Healthcare app case study: problem, approach, stack, and measurable outcomes."
        path="/case-study/healthcare"
      />
      <p className="text-teal-400 uppercase tracking-widest text-xs mb-3">Case Study</p>
      <h1 className="text-4xl font-bold mb-8">Healthcare App</h1>

      <div className="space-y-8 text-slate-300 leading-7">
        <div>
          <h2 className="text-2xl text-white mb-3">Problem</h2>
          <p>
            Users needed one place to track appointments, health updates, and reminders across
            devices. The earlier flow had slow initial loads and frequent drop-offs on mobile.
          </p>
        </div>

        <div>
          <h2 className="text-2xl text-white mb-3">Approach</h2>
          <p>
            I rebuilt the dashboard IA, simplified primary actions, and introduced reusable UI
            blocks for records and notifications. I also optimized render paths and data fetching.
          </p>
        </div>

        <div>
          <h2 className="text-2xl text-white mb-3">Tech</h2>
          <p>React, Firebase, Tailwind CSS, Framer Motion, EmailJS.</p>
        </div>

        <div>
          <h2 className="text-2xl text-white mb-3">Outcome</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reduced dashboard load time by 40%.</li>
            <li>Supported 500+ active users in pilot usage.</li>
            <li>Improved mobile completion rate for key actions by 28%.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHealthcare;
