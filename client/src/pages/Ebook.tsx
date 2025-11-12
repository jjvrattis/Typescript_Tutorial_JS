import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BookOpen } from "lucide-react";
import modules from "@/data/modules";

export default function Ebook() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Fullstack Academy</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Voltar</Link>
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="font-bold text-lg mb-4">Módulos</h3>
              <div className="space-y-2">
                {modules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModule(mod.id)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      selectedModule === mod.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">#{mod.id}</span>
                      <span className="text-sm line-clamp-2">{mod.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedModule ? (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                <div className="mb-6">
                  <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-2">
                    Módulo {selectedModule}
                  </div>
                  <h1 className="text-4xl font-bold mb-2">
                    {modules[selectedModule - 1].title}
                  </h1>
                  <p className="text-slate-400">{modules[selectedModule - 1].description}</p>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  <div className="bg-slate-700 rounded p-6 my-6">
                    <p className="text-slate-300">
                      Clique no botão Ler Completo para acessar o conteúdo completo deste módulo com explicações detalhadas, exemplos práticos e desafios interativos!
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-slate-700">
                  {selectedModule > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedModule(selectedModule - 1)}
                    >
                      ← Módulo Anterior
                    </Button>
                  )}
                  <Link href={`/ebook/${selectedModule}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Ler Completo →
                    </Button>
                  </Link>
                  {selectedModule < modules.length && (
                    <Button
                      onClick={() => setSelectedModule(selectedModule + 1)}
                    >
                      Próximo Módulo →
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Selecione um módulo</h2>
                <p className="text-slate-400">
                  Escolha um módulo na barra lateral para começar a aprender
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Module Grid View */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Todos os Módulos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link key={mod.id} href={`/ebook/${mod.id}`}>
                <Card
                  className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer h-full"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{mod.title}</CardTitle>
                        <p className="text-sm text-slate-400 mt-2">{mod.description}</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-400">#{mod.id}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Ler <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
