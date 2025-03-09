from collections import Counter

def ingresa_numeros():
    while True:
        entrada = input("Por favor ingresa la lista de numeros aqui: ")
        numeros = entrada.replace("","").split(",")
        
        if all(num.lstrip('-').isdigit() for num in numeros):
            return list(map(int, numeros))
        else: 
            print("Error: solo digita numeros enteros y separalos por comas, Gracias!")
            


def num_frecuentes(numeros):
    conteo = Counter(numeros)
     
    repetidos = conteo.most_common(2)

    return repetidos

numeros_ingresados = ingresa_numeros()

frecuentes = num_frecuentes(numeros_ingresados)
print("Los numeros con mas frecuencia son :")
for num, frecuencia in frecuentes:
    print(f"- Numero {num}: {frecuencia} veces")
 
