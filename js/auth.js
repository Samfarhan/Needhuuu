function verifyCode() {
    const code = document.getElementById("passcode").value;
    const errorEl = document.getElementById("errorMessage");
    const card = document.getElementById("loginCard");
    const wipe = document.getElementById("screenWipe");

    if (code === "2910") {
        errorEl.style.opacity = "0";
        
        // Disable touch actions immediately so she can't click twice during transition
        document.body.style.pointerEvents = "none";

        // Step 1: Spin and compress the login card dramatically
        gsap.to(card, {
            duration: 0.6,
            scale: 0.4,
            rotation: 15,
            opacity: 0,
            ease: "back.in(1.5)"
        });

        // Step 2: Fire the giant expanding Liquid Bleed background bubble wipe
        // Position the starting dot directly at the center of the viewport
        gsap.set(wipe, { 
            xPercent: -50, 
            yPercent: -50, 
            left: "50%", 
            top: "50%",
            width: "0vw",
            height: "0vw",
            opacity: 1
        });

        // Scale it up smoothly until it completely swallows the phone layout
        gsap.to(wipe, {
            duration: 1.2,
            width: "300vw",  // Large enough to cover all angles
            height: "300vw",
            delay: 0.3,
            ease: "power4.inOut",
            onComplete: () => {
                // Instantly swap pages once the screen is fully masked by the blue solid wave
                window.location.href = "page1-welcome.html";
            }
        });

    } else {
        // RESET INPUT ON ERROR
        document.getElementById("passcode").value = "";
        errorEl.innerText = "✨ Magic key incorrect! Give it another shot ✨";
        errorEl.style.opacity = "1";
        errorEl.style.height = "auto";

        // Ultra-clean elastic bounce rumble instead of standard basic shake
        gsap.to(card, {
            duration: 0.05,
            x: 12,
            repeat: 5,
            yoyo: true,
            ease: "none",
            onComplete: () => {
                gsap.to(card, { x: 0, duration: 0.2, ease: "power2.out" });
            }
        });
    }
}
