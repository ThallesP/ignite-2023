import { randomUUID } from "crypto";
export type TaskProps = {
  id?: string;
  title: string;
  description: string;
  completed_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
};

/*
- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.
*/

export class Task {
  public readonly id: string;
  public title: string;
  public description: string;
  public completed_at: Date | null;
  public created_at: Date;
  public updated_at: Date;

  constructor(props: TaskProps, id?: string) {
    Object.assign(this, {
      ...props,
      id: id ?? randomUUID(),
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      completed_at: props.completed_at ?? null,
    });
  }
}
