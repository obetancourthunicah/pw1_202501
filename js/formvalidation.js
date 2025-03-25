const regexIsEmpty = /^\s*$/;

document.addEventListener('DOMContentLoaded', () => {
    const formSolicitud = document.getElementById("formSolicitud");
    const txtPrimerNombre = document.getElementById("txtPrimerNombre");
    const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");

    function onSubmit_formSolicitud (e) {
        const errors = {};
        let hasErrors = false;
        if (regexIsEmpty.test(txtPrimerNombre.value)){
            hasErrors = true;
            errors["txtPrimerNombreError"] = "El nombre no puede ir vacío.";
        }

        if (hasErrors) {
            alert (
                JSON.stringify(errors, null, 2)
            );
        }
        e.preventDefault();
        e.stopPropagation();
    }


    formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
});