```mermaid
erDiagram
    users {
        string cpf PK
        string name
        string type
        timestamp created_at
    }

    users-admin {
        string uuid PK
        timestamp created_at
    }
```