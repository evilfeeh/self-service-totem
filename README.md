# SELF ATENDENCE TOTEM

<img alt="Node Version" src="https://img.shields.io/badge/Node_Version-20.18-green"> <img src="https://img.shields.io/github/actions/workflow/status/evilfeeh/self-attendence-totem/node.js.yml?label=Node%20Build"> <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/evilfeeh/self-attendence-totem/dependency-review.yml?label=Dependecy%20Review"> <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/evilfeeh/self-attendence-totem/codeql.yml?label=Code%20Security">

This Project about Tech Challenge from FIAP
A monolith backend Developed with TypeScript, Docker, DDD and hexagonal architecture.

## ABOUT

We're introducing an Software that aims to optimize the self-service process in fast-food restaurants. Through an interactive totem, customers can place their orders quickly, conveniently and autonomously, reducing queues and speeding up service.

## FEATURES

- Customer:
  - [x] Register a new customer
  - [x] identify a customer by their CPF
- Product:
  - [x] Create, update and delete a product
  - [x] Find a product by category
- Orders:
  - [x] Register a new order
  - [x] Simulate checkout process (fake checkout)
  - [x] List orders

## PREREQUISITES
  <img alt="Docker" src="https://img.shields.io/badge/Docker-latest">

## HOW TO SETUP:

Clone the project repository:
```bash
git clone https://github.com/evilfeeh/self-service-totem.git
```

Access the project directory:
```bash
cd self-attendence-totem
```

Run the application with Docker Compose:
```bash
docker compose up
```

The apps runs into port 3000, it's possible to change the value port or other environments inside a .env file

To access the docs, access:
`http://localhost:3000/docs`
