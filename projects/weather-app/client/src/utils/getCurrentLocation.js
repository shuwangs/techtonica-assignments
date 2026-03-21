	export const handleClickLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log("Success:", position);
				try {
					const { latitude, longitude } = position.coords;
					onLocationSubmit(latitude, longitude);
				} catch (err) {
					console.error("Getting Location Error:", err);
					alert("Couldnot get your location");
				}
			});
		}
	};
