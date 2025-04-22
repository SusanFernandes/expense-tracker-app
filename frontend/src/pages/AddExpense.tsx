import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonButtons,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonAlert
} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { getAllExpenses, deleteExpense } from '../services/api';
import { Expense } from '../types/expense';

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const history = useHistory();

  const loadExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleRefresh = async (event: any) => {
    await loadExpenses();
    event.detail.complete();
  };

  const confirmDelete = (id: number) => {
    setExpenseToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    if (expenseToDelete !== null) {
      try {
        await deleteExpense(expenseToDelete);
        setExpenses(expenses.filter(expense => expense.id !== expenseToDelete));
      } catch (error) {
        console.error('Failed to delete expense:', error);
      }
    }
    setShowDeleteAlert(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expense Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <IonList>
          {expenses.length === 0 ? (
            <IonItem>
              <IonLabel>No expenses found. Add one!</IonLabel>
            </IonItem>
          ) : (
            expenses.map((expense) => (
              <IonItemSliding key={expense.id}>
                <IonItem>
                  <IonLabel>
                    <h2>${expense.amount.toFixed(2)} - {expense.category}</h2>
                    <p>{expense.note}</p>
                  </IonLabel>
                  <IonNote slot="end">{formatDate(expense.date)}</IonNote>
                </IonItem>
                
                <IonItemOptions side="end">
                  <IonItemOption color="primary" onClick={() => history.push(`/edit/${expense.id}`)}>
                    <IonIcon slot="icon-only" icon={create} />
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => confirmDelete(expense.id)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          )}
        </IonList>
        
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={'Delete Expense'}
          message={'Are you sure you want to delete this expense?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: handleDelete
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ExpenseList;