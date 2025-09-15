import { self } from 'react-native-threads';

self.onmessage = (message) => {
    let count = message;
    
    const interval = setInterval(() => {
        count--;
        self.postMessage(count);

        if (count <= 0) {
            clearInterval(interval);
            self.terminate();
        }
    }, 1000);
};
