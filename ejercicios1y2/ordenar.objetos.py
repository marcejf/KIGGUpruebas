def ordenar_objetos(lista):
    impares = [objeto for objeto in lista if objeto["prioridad"] % 2 != 0]     
    pares = [objeto for objeto in lista if objeto["prioridad"] % 2 == 0]
    
    return impares + pares

objetos_de_prueba = [
    {"id" : 1, "prioridad": 2},
    {"id" : 2, "prioridad": 1},
    {"id" : 3, "prioridad": 5},
    {"id" : 4, "prioridad": 3},
    {"id" : 5, "prioridad": 4}
]

objetos_ordenados = ordenar_objetos(objetos_de_prueba)

print ("\nLista ordenada por prioridad:")
for objeto in objetos_ordenados:
    print(f"- ID {objeto['id']}|  prioridad {objeto['prioridad']}")