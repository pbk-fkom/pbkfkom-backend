let jquery_datatable = $('#table1').DataTable({
    responsive: true,
    "drawCallback": function() {
        $('.delete-confirm').on('click', function(event) {
            event.preventDefault();
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Jika data dihapus maka data yang bersangkutan akan ikut terhapus juga.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    let action = $(this).attr('data-action');
                    let token = $(this).attr('data-token');

                    $('body').html(
                        "<form class='form-inline remove-form' method='post' action='" +
                        action + "'></form>");
                    $('body').find('.remove-form').append(
                        '<input name="_csrf" type="hidden" value="' +
                        token + '">');
                    $('body').find('.remove-form').submit();
                }
            });
        });
    }
});

const setTableColor = () => {
    document.querySelectorAll('.dataTables_paginate .pagination').forEach(dt => {
        dt.classList.add('pagination-primary')
    })
}
setTableColor()
jquery_datatable.on('draw', setTableColor)