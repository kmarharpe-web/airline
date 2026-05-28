// Self-executing UI patch injector for Airline Club Solo Sandbox
(function() {
    window.addEventListener('load', function() {
        console.log("Sandbox UI Hook Attached.");

        // 1. Construct a clean visual controls container
        const controlPanel = document.createElement('div');
        controlPanel.style.position = 'fixed';
        controlPanel.style.bottom = '20px';
        controlPanel.style.right = '20px';
        controlPanel.style.zIndex = '99999';
        controlPanel.style.background = '#222';
        controlPanel.style.padding = '15px';
        controlPanel.style.borderRadius = '8px';
        controlPanel.style.border = '2px solid #ff9900';
        controlPanel.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';

        controlPanel.innerHTML = `
            <h4 style="color:#ff9900; margin:0 0 10px 0; font-family:sans-serif; font-size:14px; text-align:center;">Solo Sandbox Controls</h4>
            <button id="sandboxAdvanceBtn" style="background:#ff9900; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; width:100%;">
                ⏭️ Next Turn (1 Week)
            </button>
        `;
        document.body.appendChild(controlPanel);

        // 2. Bind the network controller call to the button element
        document.getElementById('sandboxAdvanceBtn').addEventListener('click', function() {
            const btn = this;
            btn.disabled = true;
            btn.innerText = "Simulating Week...";

            fetch('/api/simulation/advance', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if(data.status === "success") {
                        alert("Turn completed successfully! Syncing database views...");
                        window.location.reload();
                    } else {
                        alert("Simulation Engine Error: " + data.message);
                        btn.disabled = false;
                        btn.innerText = "⏭️ Next Turn (1 Week)";
                    }
                })
                .catch(err => {
                    alert("Network error: Check if backend server is online.");
                    btn.disabled = false;
                    btn.innerText = "⏭️ Next Turn (1 Week)";
                });
        });

        // 3. Clean layout visibility styles to wipe away competitor visual items
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            .ranking-menu, #alliance-map-controls, .competitor-routes-table, 
            #global-market-share-chart, .alliance-leaderboards, .rival-airline-ticker { 
                display: none !important; 
                visibility: hidden !important;
            }
        `;
        document.head.appendChild(styleSheet);
    });
})();
