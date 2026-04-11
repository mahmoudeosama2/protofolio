import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputClass =
    'w-full bg-[#111111] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 placeholder-gray-600 focus:bg-[#161616]';

  return (
    <section id="contact" className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Contact me</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-dark-100 p-8 rounded-3xl border border-white/5 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/80 text-[#111111] font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,180,251,0.5)] flex items-center gap-2 transform hover:-translate-y-1"
              >
                {sent ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
