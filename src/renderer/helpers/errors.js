const funcs = {
    render(errors){
    	if(errors){
	    	if(errors.isArray){
				for(var i in errors){
					$.toast({
			            heading: 'Ocurrió un error',
			            text: errors[i],
			            position: 'top-right',
			            loaderBg:'#ff6849',
			            icon: 'error',
			            hideAfter: 5000,
			            stack: 6
			        });
				}
	    	}else{
				$.toast({
		            heading: 'Ocurrió un error',
		            text: errors,
		            position: 'top-right',
		            loaderBg:'#ff6849',
		            icon: 'error',
		            hideAfter: 5000,
		            stack: 6
		        });
	    	}
    	}else{
			$.toast({
	            heading: 'Error interno',
	            text: 'Algo no funciona como debería',
	            position: 'top-right',
	            loaderBg:'#ff6849',
	            icon: 'error',
	            hideAfter: 5000,
	            stack: 6
	        });
    	}

	},
	display(error){
		$.toast({
            heading: 'Ocurrió un error',
            text: error,
            position: 'top-right',
            loaderBg:'#ff6849',
            icon: 'error',
            hideAfter: 5000,
            stack: 6
        });
	}
}

export default funcs

