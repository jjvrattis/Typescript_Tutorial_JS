import React from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import modules from "@/data/modules";

export default function Modulo() {
  const params = useParams();
  const moduloNum = parseInt(params.modulo || "1");

  const modulo = modules[moduloNum - 1] || modules[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/ebook" className="flex items-center gap-2 hover:opacity-80">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Fullstack Academy</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/ebook">Voltar</Link>
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4">
            Módulo {moduloNum} de {modules.length}
          </div>
          <h1 className="text-5xl font-bold mb-4">{modulo.title}</h1>
          <p className="text-xl text-slate-300">{modulo.description}</p>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Conteúdo do Módulo</h2>
            <p className="text-slate-300 mb-6">
              Este módulo contém explicações detalhadas, exemplos práticos comentados, exercícios de fixação e boas práticas.
            </p>

            <div className="bg-slate-700 rounded p-6 my-6">
              <h3 className="font-bold mb-4">Tópicos Principais</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Conceitos fundamentais</li>
                <li>✓ Exemplos práticos comentados</li>
                <li>✓ Exercícios de fixação</li>
                <li>✓ Boas práticas e dicas</li>
                <li>✓ Erros comuns e como evitá-los</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold mt-8 mb-4">Como Estudar Este Módulo</h3>
            <ol className="space-y-2 text-slate-300">
              <li>1. Leia atentamente cada seção</li>
              <li>2. Execute os exemplos de código</li>
              <li>3. Faça os exercícios propostos</li>
              <li>4. Revise os conceitos principais</li>
              <li>5. Passe para o próximo módulo</li>
            </ol>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {moduloNum > 1 && (
            <Button variant="outline" asChild>
              <Link href={`/ebook/${moduloNum - 1}`}>
                <ChevronLeft className="mr-2 w-4 h-4" />
                Módulo Anterior
              </Link>
            </Button>
          )}
          {moduloNum < modules.length && (
            <Button asChild>
              <Link href={`/ebook/${moduloNum + 1}`}>
                Próximo Módulo
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Progress */}
        <div className="mt-12 bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="font-bold mb-4">Progresso do Curso</h3>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${(moduloNum / modules.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-slate-400 mt-2">
            {moduloNum} de {modules.length} módulos concluídos ({Math.round((moduloNum / modules.length) * 100)}%)
          </p>
        </div>
      </div>
    </div>
  );
}
