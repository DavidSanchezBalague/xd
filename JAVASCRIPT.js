var topPosRaton = 0;
	var leftPosRaton = 0;
	var topPosPerro = 0;
	var leftPosPerro = 0;
	var ratonvisible = true;
	var perroAtrapoRaton = false;

	var tiempoRestante = 30;
	var contadorInterval;

	window.onload = function () {
	  const raton = document.getElementById("buscar");
	  const perro = document.getElementById("objetivo");
	  const cuenta = document.getElementById("cuenta");
	  const tablero = document.getElementById("tablero");
	  perro.style.display = 'none';

	  document.addEventListener('keydown', CambiarImg);
	  contadorInterval = setInterval(actualizarContador, 1000);

	  function actualizarContador() {
        contador.textContent = "Tiempo restante: " + tiempoRestante + " segundos";
        if (tiempoRestante <= 0) {
		contador.textContent = "El tiempo ha terminado.";
          raton.style.display = 'block';
          perro.style.display = 'block';
          clearInterval(contadorInterval);
          document.removeEventListener('keydown', CambiarImg); 
        }
        tiempoRestante--;
      }

      function CambiarImg(event) {
        if (event.key === 'Enter') {
          ratonvisible = !ratonvisible;
          raton.style.display = ratonvisible ? 'block' : 'none';
          perro.style.display = ratonvisible ? 'none' : 'block';
        } else if (tiempoRestante > 0 && !perroAtrapoRaton) {
          MoverImg(event.key);
        }
      }

	  function MoverImg(direction) {
		const step = 50;
		const tableroWidth = tablero.offsetWidth - 50;
		const tableroHeight = tablero.offsetHeight - 50;
  
		if (ratonvisible) {
		  switch (direction) {
			case 'ArrowDown':
			  topPosRaton = Math.min(topPosRaton + step, tableroHeight);
			  break;
			case 'ArrowUp':
			  topPosRaton = Math.max(topPosRaton - step, 0);
			  break;
			case 'ArrowLeft':
			  leftPosRaton = Math.max(leftPosRaton - step, 0);
			  break;
			case 'ArrowRight':
			  leftPosRaton = Math.min(leftPosRaton + step, tableroWidth);
			  break;
		  }

		  raton.style.top = topPosRaton + 'px';
		  raton.style.left = leftPosRaton + 'px';

		} else {
		  switch (direction) {
			case 'ArrowDown':
			  topPosPerro = Math.min(topPosPerro + step, tableroHeight);
			  break;
			case 'ArrowUp':
			  topPosPerro = Math.max(topPosPerro - step, 0);
			  break;
			case 'ArrowLeft':
			  leftPosPerro = Math.max(leftPosPerro - step, 0);
			  break;
			case 'ArrowRight':
			  leftPosPerro = Math.min(leftPosPerro + step, tableroWidth);
			  break;
		  }

		  perro.style.top = topPosPerro + 'px';
		  perro.style.left = leftPosPerro + 'px';

		}

		if (topPosRaton === topPosPerro && leftPosRaton === leftPosPerro && !ratonvisible) {
		  perroAtrapoRaton = true;
		  cuenta.textContent = "El perro atrapó al ratón";
		  clearInterval(contadorInterval);
		}

	  }
	};