import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Zap } from "lucide-react";

const projetos = [
  {
    id: 1,
    title: "ToDo App Fullstack",
    description: "Aplicação completa de gerenciamento de tarefas com backend robusto e frontend moderno",
    tech: ["Node.js", "Express", "React", "TypeScript", "Prisma", "PostgreSQL"],
    features: [
      "CRUD completo de tarefas",
      "Autenticação JWT",
      "Banco de dados PostgreSQL",
      "API REST",
      "Interface responsiva",
      "Deploy em produção"
    ],
    deploy: "https://todo-app.exemplo.com",
    github: "https://github.com/exemplo/todo-app"
  },
  {
    id: 2,
    title: "App Mobile Controle Financeiro",
    description: "Aplicativo mobile para controle de despesas pessoais com gráficos e relatórios",
    tech: ["React Native", "TypeScript", "AsyncStorage", "Charts"],
    features: [
      "Registro de despesas e receitas",
      "Categorização de transações",
      "Gráficos de gastos",
      "Armazenamento local",
      "Exportação de relatórios",
      "Interface intuitiva"
    ],
    deploy: "https://play.google.com/store/apps/details?id=com.exemplo",
    github: "https://github.com/exemplo/finance-app"
  },
  {
    id: 3,
    title: "Chatbot com IA",
    description: "Assistente inteligente de estudos usando OpenAI API com autenticação e persistência",
    tech: ["Node.js", "React", "TypeScript", "OpenAI", "JWT", "Vercel"],
    features: [
      "Chat em tempo real",
      "Integração com OpenAI",
      "Histórico de conversas",
      "Autenticação de usuários",
      "Deploy automático",
      "Interface moderna"
    ],
    deploy: "https://chatbot-ia.vercel.app",
    github: "https://github.com/exemplo/chatbot-ia"
  }
];

export default function Projetos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Zap className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Fullstack Academy</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Voltar</Link>
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Projetos de Conclusão</h1>
          <p className="text-xl text-slate-300">
            Três projetos completos e em produção para demonstrar seu domínio em desenvolvimento fullstack
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projetos.map((projeto, idx) => (
            <div key={projeto.id} className="grid md:grid-cols-2 gap-8 items-center">
              {/* Alternating layout */}
              {idx % 2 === 0 ? (
                <>
                  <div>
                    <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                      Projeto {projeto.id}
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{projeto.title}</h2>
                    <p className="text-lg text-slate-300 mb-6">{projeto.description}</p>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Tecnologias</h3>
                      <div className="flex flex-wrap gap-2">
                        {projeto.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-slate-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Funcionalidades</h3>
                      <ul className="space-y-2">
                        {projeto.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-slate-300">
                            <span className="text-blue-400">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button asChild>
                        <a href={projeto.deploy} target="_blank" rel="noopener noreferrer">
                          Ver Deploy <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={projeto.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 w-4 h-4" /> GitHub
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-slate-400">Preview do Projeto {projeto.id}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 h-96 flex items-center justify-center order-2 md:order-1">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💻</div>
                      <p className="text-slate-400">Preview do Projeto {projeto.id}</p>
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4">
                      Projeto {projeto.id}
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{projeto.title}</h2>
                    <p className="text-lg text-slate-300 mb-6">{projeto.description}</p>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Tecnologias</h3>
                      <div className="flex flex-wrap gap-2">
                        {projeto.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-slate-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Funcionalidades</h3>
                      <ul className="space-y-2">
                        {projeto.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-slate-300">
                            <span className="text-blue-400">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button asChild>
                        <a href={projeto.deploy} target="_blank" rel="noopener noreferrer">
                          Ver Deploy <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={projeto.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 w-4 h-4" /> GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-20 bg-slate-800 rounded-lg border border-slate-700 p-12">
          <h2 className="text-3xl font-bold mb-8">Caminho de Aprendizado</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Estude o Ebook",
                desc: "Comece com os 9 módulos do ebook, aprendendo desde fundamentos até deploy"
              },
              {
                step: "2",
                title: "Construa os Projetos",
                desc: "Implemente os 3 projetos seguindo os exemplos e boas práticas aprendidas"
              },
              {
                step: "3",
                title: "Faça Deploy",
                desc: "Coloque seus projetos em produção e compartilhe com o mundo"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Acesse o ebook e comece sua jornada para dominar desenvolvimento fullstack
          </p>
          <Button size="lg" asChild>
            <Link href="/ebook">Acessar Ebook</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
