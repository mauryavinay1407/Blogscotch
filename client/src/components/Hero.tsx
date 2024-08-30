import {motion} from 'framer-motion';

export const Hero = () => {
  return (
    <section className="hero bg-cover bg-center text-white text-center py-32" style={{ backgroundImage: "url('hero.jpg')" }} id="home">
       <div className="container mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the Latest in blog
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg mb-8">Short description of your blog.</p>
        </motion.div>
      </motion.div>
      <a href="#latest-post" className="btn bg-orange-500 text-white px-6 py-3 rounded-md">
        Read Our Latest Post
      </a>
    </div>
    </section>
  )
}
