'''
    self es comparable con el operador this de Java,
    este siempre va implementado como atributo en cada 
    metodo que se realice dentro de la clase 
'''
class Contacto:
    # Implementacion del constructor
    def __init__(self, nombre, descripcion, numero):
        self.nombre = nombre
        self.descripcion = descripcion
        self.numero = numero

    def getNombre(self):
        return self.nombre

    def setNumero(self, numero):
        self.numero = numero

    '''
        Metodo que realiza la conversion del objeto que maneja Python
        hacia la notacion de un JSON (Javascript Object Notation)
    ''' 
    def getJson(self):
        return {"nombre": self.nombre, "descripcion": self.descripcion, "numero": self.numero}