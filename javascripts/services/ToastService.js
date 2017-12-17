'use strict';

app.service("ToastService", function(ngToast) {
    const toast = (message) => {
        ngToast.success({
            content: message,
            dismissButton: true,
            timeout: 2000
          });
    };

    return {toast};
});