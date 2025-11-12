import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code2, Rocket, Users, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Fullstack Academy</span>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/ebook" className="hover:text-blue-400 transition">
              Ebook
            </Link>
            <Link href="/projetos" className="hover:text-blue-400 transition">
              Projetos
            </Link>
            <Button variant="default" size="sm" asChild>
              <Link href="/ebook">Começar</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Domine Desenvolvimento Fullstack
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Do JavaScript iniciante ao TypeScript avançado. Aprenda a construir aplicações web, mobile e com IA do zero ao deploy em produção.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/ebook">
                  Começar Agora <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-3xl opacity-20"></div>
            <div className="relative bg-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="space-y-4 font-mono text-sm">
                <div className="text-green-400">$ npm create vite@latest fullstack-app</div>
                <div className="text-slate-400">✓ TypeScript</div>
                <div className="text-slate-400">✓ React + Tailwind</div>
                <div className="text-slate-400">✓ Node.js + Express</div>
                <div className="text-slate-400">✓ PostgreSQL + Prisma</div>
                <div className="text-slate-400">✓ React Native</div>
                <div className="text-slate-400">✓ OpenAI Integration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">O que você vai aprender</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "9 Módulos Completos",
              description: "De fundamentos até padrões avançados e deployment em produção"
            },
            {
              icon: Code2,
              title: "Código Prático",
              description: "Exemplos reais comentados passo a passo para cada conceito"
            },
            {
              icon: Rocket,
              title: "3 Projetos Reais",
              description: "ToDo App, App Mobile e Chatbot com IA - todos em produção"
            },
            {
              icon: Users,
              title: "Metodologia Feynman",
              description: "Explicações simples de conceitos complexos, como para uma criança"
            },
            {
              icon: Star,
              title: "Boas Práticas",
              description: "SOLID, Design Patterns, Clean Code e arquitetura profissional"
            },
            {
              icon: ArrowRight,
              title: "Independência",
              description: "Desenvolva sozinho sem tutores - você será totalmente autossuficiente"
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition">
              <CardHeader>
                <feature.icon className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modules Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Estrutura do Ebook</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { num: 1, title: "Fundamentos do JavaScript", desc: "Tipos, funções, objetos, DOM e assincronismo" },
            { num: 2, title: "Transição para TypeScript", desc: "Tipagem, interfaces, genéricos e classes" },
            { num: 3, title: "Ambiente e Ferramentas", desc: "Node.js, npm, Vite, ESLint e Jest" },
            { num: 4, title: "Back-end com TypeScript", desc: "Express, Prisma, JWT e middlewares" },
            { num: 5, title: "Front-end com TypeScript", desc: "React, Hooks, TailwindCSS e componentização" },
            { num: 6, title: "Mobile com TypeScript", desc: "React Native, navegação e armazenamento local" },
            { num: 7, title: "Integração com IA", desc: "OpenAI API, chatbots e geração de conteúdo" },
            { num: 8, title: "Boas Práticas", desc: "SOLID, Design Patterns e Clean Architecture" },
            { num: 9, title: "Deploy e CI/CD", desc: "Git, Docker, GitHub Actions e produção" }
          ].map((mod) => (
            <Card key={mod.num} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{mod.title}</CardTitle>
                    <CardDescription className="text-slate-400">{mod.desc}</CardDescription>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">#{mod.num}</div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Projetos de Conclusão</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "ToDo App Fullstack",
              tech: "Node.js + Express + React + Prisma",
              desc: "Aplicação completa com backend, frontend e banco de dados"
            },
            {
              title: "App Mobile Financeiro",
              tech: "React Native + TypeScript",
              desc: "Controle financeiro pessoal com gráficos e persistência local"
            },
            {
              title: "Chatbot com IA",
              tech: "Node.js + React + OpenAI",
              desc: "Assistente de estudos inteligente com autenticação e deploy"
            }
          ].map((proj, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{proj.title}</CardTitle>
                <CardDescription className="text-blue-400">{proj.tech}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">{proj.desc}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/projetos">Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
        <p className="text-xl text-slate-300 mb-8">
          Acesse o ebook completo e comece sua jornada para se tornar um desenvolvedor fullstack profissional.
        </p>
        <Button size="lg" asChild>
          <Link href="/ebook">
            Acessar Ebook <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Fullstack Academy</h3>
              <p className="text-slate-400">Educação técnica de qualidade para desenvolvedores</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/ebook">Ebook</Link></li>
                <li><Link href="/projetos">Projetos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tecnologias</h4>
              <ul className="space-y-2 text-slate-400">
                <li>TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-slate-400">Desenvolvido com ❤️ para desenvolvedores</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Fullstack Academy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
