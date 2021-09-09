'''
    Flask: es la libreria para poder crear el servidor
    jsonify: crea la representación de un objeto JSON con los parametros que le enviamos
    request: recibe y maneja la peticion http enviada
'''
from flask import Flask, jsonify, request
from flask_cors import CORS
from contacto import Contacto

app = Flask(__name__) # Inicializacion de la aplicación de Flask
CORS(app) # Habilitando la peticion de recursos 
contactos = [] # Arreglo para almacenar los contactos

'''
    El route pueden manejar varios parametros entre los mas importantes son, la ruta 
    como tal y el tipo de petición a la cual pertenece, si se omite el tipo de peticion
    por defecto es una peticion de tipo get.

    Todas las rutas creadas tienen que tener un return.
'''
@app.route("/agregarContacto", methods = ["post"])
def agregarContacto():
    # request.json nos devuelve el cuerpo(body) de la peticion enviada hacia esa ruta
    recibido = request.json

    duplicado = validarDuplicado(recibido["nombre"])
    if duplicado:
        return jsonify({"mensaje": "contacto duplicado"})
    else:
        contactos.append(Contacto(recibido["nombre"], recibido["descripcion"], recibido["numero"]))
        return jsonify({"mensaje": "contacto insertado"})

@app.route("/obtenerContactos", methods = ["get"])
def obtenerContactos():
    return jsonify(obtenerArreglo())

@app.route("/eliminarContacto/<string:nombre>", methods = ["delete"])
def eliminarContacto(nombre):
    eliminado = eliminar(nombre)
    if eliminado:
        return jsonify({"mensaje": "contacto eliminado"})
    else:
        return jsonify({"mensaje": "contacto no encontrado"})

@app.route("/actualizarContacto/<string:nombre>", methods = ["put"])
def actualizarContacto(nombre):
    actualizado = actualizar(nombre, request.json["numero"])

    if actualizado:
        return jsonify({"mensaje": "numero actualizado"})
    else:
        return jsonify({"mensaje": "contacto no encontrado"})

def actualizar(nombre, numero):
    bandera = False

    # Sintaxis de un for each, este interactua devolviendo como tal el valor del arreglo
    for contacto in contactos:
        if contacto.getNombre() == nombre:
            contacto.setNumero(numero)
            bandera = True
            break

    return bandera

def eliminar(nombre):
    bandera = False

    # sintaxis de un for iterativo normal, donde range puede tener inicio, fin y paso
    for i in range(0, len(contactos)):
        if contactos[i].getNombre() == nombre:
            contactos.pop(i)
            bandera = True
            break

    return bandera

def validarDuplicado(nombre):
    banderaDuplicado = False

    for contacto in contactos:
        if contacto.getNombre() == nombre:
            banderaDuplicado = True
            break

    return banderaDuplicado

def obtenerArreglo():
    arreglo = []
    for contacto in contactos:
        arreglo.append(contacto.getJson())

    return arreglo

if __name__ == "__main__":
    '''
        El puerto por defecto de flask es el 5000.

        El modo debug es para poder aplicar cambios en el servidor y verlos refleados al instante, 
        tambien podemos ver ciertos indicadores de las peticiones que entran a nuestro servidor. 

        El host 0.0.0.0 realiza la conversion internamente para trabajar con la ip que tenga nuestra
        computadora
    '''
    app.run(port = 3000, debug = True, host = "0.0.0.0")