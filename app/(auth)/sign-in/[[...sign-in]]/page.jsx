import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-7 lg:h-full xl:col-span-6">
            <img
              alt="AI Interview Mocker"
              src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to AI Interview Mocker 🎙️
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Prepare for your next job interview with our AI-powered mock interview platform.
                Get real-time feedback and insights to ace your interviews!
              </p>
            </div>
          </section>

          <main
            className="flex bg-gray-900 items-center justify-center px-8 py-8 sm:px-12 lg:col-span-5 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                  Welcome to AI Interview Mocker 🎙️
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                  Practice, improve, and gain confidence with our AI-driven mock interviews.
                </p>
              </div>

              <SignIn />
            </div>
          </main>
        </div>
      </section>
    </>
  )
}