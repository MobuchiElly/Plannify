import {Notification} from 'window';
import { Task } from './components/pages/Home';

interface ReminderData {
    todoItem: Task;
    reminderTime: number;
};

onmessage = (event: MessageEvent<ReminderData>) => {
    const { todoItem, reminderTime } = event.data;
    setTimeout(() => {
        displayNotification(todoItem);
        close();
    
}

function displayNotification(todoItem: Task){
    new Notification(`Reminder: ${todoItem.title}`, {
        body: todoItem.title,
        icon: '/vite.png'
    })
}