import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
  IonDatetime,
  IonLoading,
  IonToast
} from '@ionic/react';
import { getExpenseById, updateExpense } from '../services/api';
import { Expense, ExpenseFormData } from '../types/expense';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString());
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await getExpenseById(parseInt(id));
        setExpense(data);
        setAmount(data.amount);
        setCategory(data.category);
        setNote(data.note || '');
        setDate(new Date(data.date).toISOString());
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch expense:', error);
        setToastMessage('Failed to load expense');
        setShowToast(true);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const handleSubmit = async () => {
    if (!amount || !category) {
      setToastMessage('Amount and category are required');
      setShowToast(true);
      return;
    }

    try {
      const expenseData: ExpenseFormData = {
        amount,
        category,
        note,
        date
      };
      
      await updateExpense(parseInt(id), expenseData);
      history.push('/expenses');
    } catch (error) {
      console.error('Failed to update expense:', error);
      setToastMessage('Failed to update expense');
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonLoading isOpen={loading} message="Loading expense..." />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form>
          <IonItem>
            <IonLabel position="floating">Amount ($)</IonLabel>
            <IonInput 
              type="number" 
              value={amount} 
              onIonChange={e => setAmount(parseFloat(e.detail.value!))}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Category</IonLabel>
            <IonSelect 
              value={category} 
              onIonChange={e => setCategory(e.detail.value)}
              required
            >
              <IonSelectOption value="Food">Food</IonSelectOption>
              <IonSelectOption value="Transportation">Transportation</IonSelectOption>
              <IonSelectOption value="Entertainment">Entertainment</IonSelectOption>
              <IonSelectOption value="Utilities">Utilities</IonSelectOption>
              <IonSelectOption value="Shopping">Shopping</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Note</IonLabel>
            <IonTextarea 
              value={note} 
              onIonChange={e => setNote(e.detail.value!)} 
            />
          </IonItem>

          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime 
              displayFormat="MMM DD, YYYY" 
              value={date}
              onIonChange={e => setDate(e.detail.value!)}
            />
          </IonItem>

          <div style={{ padding: '20px' }}>
            <IonButton expand="block" onClick={handleSubmit}>Update Expense</IonButton>
            <IonButton expand="block" color="medium" onClick={() => history.goBack()} style={{ marginTop: '10px' }}>
              Cancel
            </IonButton>
          </div>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditExpense;