import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, add } from 'ionicons/icons';

import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/expenses">
            <ExpenseList />
          </Route>
          <Route exact path="/add">
            <AddExpense />
          </Route>
          <Route path="/edit/:id">
            <EditExpense />
          </Route>
          <Route exact path="/">
            <Redirect to="/expenses" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="expenses" href="/expenses">
            <IonIcon icon={list} />
            <IonLabel>Expenses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add" href="/add">
            <IonIcon icon={add} />
            <IonLabel>Add Expense</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;