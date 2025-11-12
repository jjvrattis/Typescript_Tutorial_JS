# Projeto 2: App Mobile Controle Financeiro

## Visão Geral

Um aplicativo mobile para controle de despesas pessoais com gráficos, categorização de transações e armazenamento local.

**Tecnologias:** React Native, TypeScript, Expo, AsyncStorage, React Native Charts

**Funcionalidades:**
- ✓ Registro de despesas e receitas
- ✓ Categorização de transações
- ✓ Gráficos de gastos
- ✓ Armazenamento local com AsyncStorage
- ✓ Exportação de relatórios
- ✓ Interface intuitiva

---

## Arquitetura

```
finance-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── AddTransactionScreen.tsx
│   │   ├── ChartsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── TransactionItem.tsx
│   │   ├── CategoryPicker.tsx
│   │   └── ChartComponent.tsx
│   ├── hooks/
│   │   └── useTransactions.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── app.json
├── package.json
└── README.md
```

---

## Setup

### 1. Criar Projeto Expo

```bash
npx create-expo-app finance-app
cd finance-app
npm install
```

### 2. Instalar Dependências

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-chart-kit
npm install react-native-svg
npm install typescript @types/react @types/react-native
```

### 3. Tipos TypeScript

**`src/types/index.ts`:**

```typescript
export type TransactionType = "income" | "expense";

export type Category = 
  | "alimentação"
  | "transporte"
  | "saúde"
  | "lazer"
  | "trabalho"
  | "outros";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  description: string;
  date: string;
}

export interface MonthlyBalance {
  income: number;
  expense: number;
  balance: number;
}
```

### 4. Hook de Transações

**`src/hooks/useTransactions.ts`:**

```typescript
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction, MonthlyBalance } from "../types";

const STORAGE_KEY = "transactions";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setTransactions(JSON.parse(data));
      }
    } catch (erro) {
      console.error("Erro ao carregar transações", erro);
    } finally {
      setLoading(false);
    }
  };

  const saveTransactions = async (newTransactions: Transaction[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
      setTransactions(newTransactions);
    } catch (erro) {
      console.error("Erro ao salvar transações", erro);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    saveTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    const filtered = transactions.filter((t) => t.id !== id);
    saveTransactions(filtered);
  };

  const getMonthlyBalance = (date: string): MonthlyBalance => {
    const [year, month] = date.split("-");
    const monthTransactions = transactions.filter((t) => {
      const tDate = t.date.split("-");
      return tDate[0] === year && tDate[1] === month;
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      balance: income - expense
    };
  };

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    getMonthlyBalance
  };
};
```

### 5. Componentes

**`src/components/TransactionItem.tsx`:**

```typescript
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Transaction } from "../types";

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onDelete
}) => {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.category}>{transaction.category}</Text>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? "#10b981" : "#ef4444" }
          ]}
        >
          {isIncome ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => onDelete(transaction.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 8
  },
  content: {
    flex: 1
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937"
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4
  },
  date: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2
  },
  amountContainer: {
    alignItems: "flex-end"
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold"
  },
  deleteButton: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fee2e2",
    borderRadius: 4
  },
  deleteText: {
    fontSize: 11,
    color: "#dc2626"
  }
});
```

**`src/components/ChartComponent.tsx`:**

```typescript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { MonthlyBalance } from "../types";

interface ChartComponentProps {
  balance: MonthlyBalance;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({ balance }) => {
  const data = {
    labels: ["Receita", "Despesa"],
    datasets: [
      {
        data: [balance.income, balance.expense]
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Mês</Text>
      <BarChart
        data={data}
        width={350}
        height={220}
        yAxisLabel="R$ "
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: () => "#3b82f6",
          labelColor: () => "#6b7280"
        }}
      />
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Saldo</Text>
          <Text
            style={[
              styles.summaryValue,
              { color: balance.balance >= 0 ? "#10b981" : "#ef4444" }
            ]}
          >
            R$ {balance.balance.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginVertical: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937"
  },
  summary: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8
  },
  summaryItem: {
    alignItems: "center"
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6b7280"
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4
  }
});
```

### 6. Telas

**`src/screens/HomeScreen.tsx`:**

```typescript
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionItem } from "../components/TransactionItem";

export const HomeScreen = ({ navigation }: any) => {
  const { transactions, deleteTransaction } = useTransactions();
  const [currentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const monthTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Transações</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTransaction")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {monthTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma transação registrada</Text>
        </View>
      ) : (
        <FlatList
          data={monthTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              onDelete={deleteTransaction}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937"
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 6
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600"
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af"
  }
});
```

---

## Deploy

### iOS

```bash
eas build --platform ios
eas submit --platform ios
```

### Android

```bash
eas build --platform android
eas submit --platform android
```

---

## Conclusão

Este projeto demonstra:
- ✓ Navegação em React Native
- ✓ Armazenamento local com AsyncStorage
- ✓ Gráficos com React Native Charts
- ✓ Gerenciamento de estado
- ✓ Interface responsiva mobile
- ✓ Deploy em app stores

Parabéns por completar o Projeto 2! 🎉
