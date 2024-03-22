import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-home',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public contentHeader: object

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.fetchUsers();
  }

  allUsers: any[] = []; // Variable para almacenar todos los usuarios sin filtrar

  departamentos = ['Desarrollo', 'Recursos Humanos', 'Ventas', 'Marketing', 'Finanzas', 'Tecnología de la Información', 'Operaciones', 'Administración', 'Logística', 'Calidad'];
  cargos = ['Desarrollador', 'Ingeniero de Software', 'Arquitecto de Software', 'Gerente de Recursos Humanos', 'Especialista en Reclutamiento', 'Analista de Personal', 'Gerente de Ventas', 'Ejecutivo de Ventas', 'Representante de Ventas', 'Gerente de Marketing', 'Especialista en Marketing Digital', 'Analista de Mercado', 'Gerente Financiero', 'Contador', 'Analista Financiero', 'Director de TI', 'Administrador de Sistemas', 'Técnico de Soporte', 'Director de Operaciones', 'Gerente de Operaciones', 'Supervisor de Producción', 'Gerente Administrativo', 'Asistente Administrativo', 'Secretaria', 'Gerente de Logística', 'Coordinador de Almacén', 'Especialista en Distribución', 'Gerente de Calidad', 'Especialista en Control de Calidad', 'Inspector de Calidad'];
  selectedDepartment: string = '';
  selectedCargo: string = '';
  departamentosFiltros = []
  cargosFiltros = []

  page = 1; // Página actual
  perPage = 8; // Elementos por página
  totalUsers = 0; // Total de usuarios
  totalItems = 0; // Total de elementos
  filteredUsers: any[] = [];

  isCreatingUser = false;
  errorMessage: string | null = null; // Propiedad para almacenar el mensaje de error
  isModalOpen = false;
  isUpdatingUser = false; // Agregar esta línea 

  userForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    primernombre: new FormControl('', Validators.required),
    segundonombre: new FormControl('', Validators.required),
    primerapellido: new FormControl('', Validators.required),
    segundoapellido: new FormControl('', Validators.required),
    departamento: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  title = 'Modulo de Administracion';
  apiUrl = 'http://127.0.0.1:8000/api'; // URL de la API Laravel
  users: any[] = []; // Variable para almacenar los datos de la API 
  selectedUser: any = null; // Usuario seleccionado para edición

  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  clearFiltro() {
    this.selectedDepartment = '';
    this.selectedCargo = '';
    this.fetchUsers();
    this.errorMessage = '';

  }

  fetchUsers() {
    this.http.get(`${this.apiUrl}/users?page=${this.page}&perPage=${this.perPage}`).subscribe((res: any) => {
      this.users = res.user.data;
      this.totalUsers = res.user.total;
      this.allUsers = res.user.data; // Guardar todos los usuarios sin filtrar
      this.departamentosFiltros = res.departamentos;
      this.cargosFiltros = res.cargos;
      this.applyFilters();
    });
  }


  changePage(page: number) {
    this.page = page;
    this.fetchUsers();
  }

  get totalPages() {
    return Array.from({ length: Math.ceil(this.totalUsers / this.perPage) }, (_, index) => index + 1);
  }


  // aplicar filtros
  applyFilters() {
    this.filteredUsers = this.allUsers.filter((user: any) => {
      const matchesDepartment = this.selectedDepartment ? user.departamento === this.selectedDepartment : true;
      const matchesRole = this.selectedCargo ? user.cargo === this.selectedCargo : true;
      return matchesDepartment && matchesRole;
    });

    this.totalItems = this.filteredUsers.length;
  }

  //abrir modal
  modalOpenAD(modalAD) {
    this.userForm.reset(); // Limpiar el formulario
    this.modalService.open(modalAD, {
      centered: true,
      windowClass: 'animation-disable',
      animation: false
    });
    this.selectedUser = null; // Limpiar el usuario seleccionado
    this.isCreatingUser = true; // Establecer que se está creando un nuevo usuario

  }


  openEditModal(user: any, modalAD) {
    this.selectedUser = user; // Establecer el usuario seleccionado para edición
    this.userForm.patchValue({
      usuario: user.usuario,
      primernombre: user.primernombre,
      segundonombre: user.segundonombre,
      primerapellido: user.primerapellido,
      segundoapellido: user.segundoapellido,
      departamento: user.departamento,
      status: user.status,
      cargo: user.cargo,
      email: user.email
    });
    this.isCreatingUser = false; // Establecer que no se está creando un nuevo usuario

    this.modalService.open(modalAD, {
      centered: true,
      windowClass: 'animation-disable',
      animation: false
    });
  }
  closeModal() {
    this.selectedCargo = '';
    this.selectedDepartment = '';
    this.modalService.dismissAll();
    this.userForm.reset(); // Limpiar el formulario
    this.errorMessage = '';
  }


  createUser() {
    if (this.userForm.valid) {
      this.isCreatingUser = true; // Indicar que se está creando un usuario
      this.http.post(`${this.apiUrl}/users`, this.userForm.value).subscribe({
        next: (res) => {
          this.fetchUsers(); // Actualizar la lista de usuarios
          this.closeModal(); // Cerrar el modal
          this.userForm.reset(); // Opcional: resetear el formulario
          this.isCreatingUser = false; // Restablecer el estado
        },
        error: (error) => {
          console.error('Error crear user:', error);
          this.errorMessage = 'Error al crear el usuario. Por favor, intenta de nuevo.'; // Mostrar mensaje de error

        }
      });
    }
  }

  updateUser() {
    if (this.userForm.valid && this.selectedUser) {
      this.isUpdatingUser = true; // Indicar que se está actualizando un usuario
      this.http.put(`${this.apiUrl}/users/${this.selectedUser.id}`, this.userForm.value).subscribe({
        next: (res) => {
          this.fetchUsers(); // Actualizar la lista de usuarios
          this.closeModal(); // Cerrar el modal
          this.userForm.reset(); // Opcional: resetear el formulario
          this.isUpdatingUser = false; // Restablecer el estado
        },
        error: (error) => {
          console.error('Error actualizar user:', error);
          this.errorMessage = 'Error al actualizar el usuario. Por favor, intenta de nuevo.'; // Mostrar mensaje de error

        }
      });
    }
  }


  deleteUser(user: any) {
    if (confirm('¿Estás seguro de que deseas eliminar el usuario seleccionado?')) {
      this.http.delete(`${this.apiUrl}/users/${user.id}`).subscribe({
        next: (res) => {
          console.log('User deleted:', res);
          this.fetchUsers(); // Actualizar la lista de usuarios
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }


}
