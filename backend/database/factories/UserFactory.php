<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departamentos = [
            'Desarrollo' => ['Desarrollador', 'Ingeniero de Software', 'Arquitecto de Software'],
            'Recursos Humanos' => ['Gerente de Recursos Humanos', 'Especialista en Reclutamiento', 'Analista de Personal'],
            'Ventas' => ['Gerente de Ventas', 'Ejecutivo de Ventas', 'Representante de Ventas'],
            'Marketing' => ['Gerente de Marketing', 'Especialista en Marketing Digital', 'Analista de Mercado'],
            'Finanzas' => ['Gerente Financiero', 'Contador', 'Analista Financiero'],
            'Tecnología de la Información' => ['Director de TI', 'Administrador de Sistemas', 'Técnico de Soporte'],
            'Operaciones' => ['Director de Operaciones', 'Gerente de Operaciones', 'Supervisor de Producción'],
            'Administración' => ['Gerente Administrativo', 'Asistente Administrativo', 'Secretaria'],
            'Logística' => ['Gerente de Logística', 'Coordinador de Almacén', 'Especialista en Distribución'],
            'Calidad' => ['Gerente de Calidad', 'Especialista en Control de Calidad', 'Inspector de Calidad']
        ];

        // Obtener un departamento aleatorio
        $departamento = array_rand($departamentos);
        // Obtener un cargo aleatorio dentro del departamento seleccionado
        $cargo = $departamentos[$departamento][array_rand($departamentos[$departamento])];

        return [
            'usuario' => $this->faker->userName(),
            'primernombre' => $this->faker->firstName(),
            'segundonombre' => $this->faker->firstName(),
            'primerapellido' => $this->faker->lastName(),
            'segundoapellido' => $this->faker->lastName(),
            'departamento' => $departamento,
            'cargo' => $cargo,
            'status' => $this->faker->boolean(),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
