from flask import Flask, json, request, jsonify
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS
 
app = Flask(__name__)
con = MySQL(app)

# Habilitar CORS para todas las rutas
CORS(app, origins="http://localhost:4200")

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'API funcionando correctamente'})

@app.route('/pizzeria/pedidos', methods=['POST'])
def lista_pedidos():
    try:
        data = request.json
        fecha = data.get('fecha')
        print("Fecha recibida:", fecha)
        
        cursor = con.connection.cursor()
        print("Cursor creado exitosamente")
        
        if fecha:
            sql = "SELECT * FROM pedidos WHERE fecha_pedido = %s"
            print("Consulta SQL preparada con filtro de fecha:", sql)
            cursor.execute(sql, (fecha,))
            print(f"Consulta SQL ejecutada con fecha: {fecha}")
        else:
            sql = "SELECT * FROM pedidos"
            print("Consulta SQL preparada sin filtro de fecha:", sql)
            cursor.execute(sql)
            print("Consulta SQL ejecutada sin filtro de fecha")
        
        datos = cursor.fetchall()
        print("Datos obtenidos de la base de datos:", datos)
        
        pedidos = []
        for fila in datos:
            pedido = {
                'id': fila[0],
                'fecha_pedido': fila[1],
                'nombre': fila[2],
                'direccion': fila[3],
                'telefono': fila[4],
                'pedido': fila[5],
                'total': float(fila[6])  # Convertir a float para manejar decimales
            }
            pedidos.append(pedido)
            print("Pedido agregado a la lista:", pedido)
        
        print("Lista de pedidos preparada:", pedidos)
        return jsonify({'pedidos': pedidos, 'mensaje': 'Lista de pedidos'}), 200
    except Exception as ex:
        print("Error al listar pedidos:", str(ex))
        return jsonify({"message": "error{}".format(ex), "exito": False}), 500

def leer_pedido_bd(id):
    try:
        cursor = con.connection.cursor()
        sql = "SELECT * FROM pedidos WHERE id = {}".format(id)
        cursor.execute(sql)
        datos = cursor.fetchone()
       
        if datos is not None:
            pedido = {
                'id': datos[0],
                'fecha_pedido': datos[1],
                'nombre': datos[2],
                'direccion': datos[3],
                'telefono': datos[4],
                'pedido': datos[5],
                'total': float(datos[6])
            }
            return pedido
        else:
            return None
    except Exception as ex:
        raise ex

@app.route("/pedidos/<id>", methods=['GET'])
def leer_pedido(id):
    try:
        pedido = leer_pedido_bd(id)
        if pedido is not None:
            return jsonify({'pedido': pedido, 'mensaje': 'Pedido encontrado', 'exito': True})
        else:
            return jsonify({'pedido': None, 'mensaje': 'Pedido no encontrado', 'exito': False})
    except Exception as ex:
        return jsonify({"message": "error {}".format(ex), 'exito': False}), 500

@app.route("/pizzeria/addPedido", methods=['POST'])
def registrar_pedido():
    try:
        # Imprimir los datos recibidos en la consola
        print("Datos recibidos:", request.json)
        
        cursor = con.connection.cursor()
        print("Cursor creado exitosamente")
        
        sql = """INSERT INTO pedidos (fecha_pedido, nombre, direccion, telefono, pedido, total)
                VALUES (%s, %s, %s, %s, %s, %s)"""
        print("Consulta SQL preparada:", sql)
        
        valores = (
            request.json['fecha_pedido'],
            request.json['nombre'],
            request.json['direccion'],
            request.json['telefono'],
            json.dumps(request.json['Pedido']),  # Convertir el pedido a JSON
            request.json['total']
        )
        print("Valores a insertar:", valores)
        
        cursor.execute(sql, valores)
        print("Consulta SQL ejecutada exitosamente")
        
        con.connection.commit()
        print("Transacción confirmada")
        
        return jsonify({'mensaje': "Pedido registrado", "exito": True})
    except Exception as ex:
        print("Error al registrar pedido:", str(ex))
        return jsonify({'mensaje': f"Error al registrar pedido: {str(ex)}", "exito": False}), 500

# Agregar endpoint para actualizar pedido
@app.route("/pedidos/<id>", methods=['PUT'])
def actualizar_pedido(id):
    try:
        pedido = leer_pedido_bd(id)
        if pedido is None:
            return jsonify({'mensaje': 'Pedido no encontrado', 'exito': False})

        cursor = con.connection.cursor()
        sql = """UPDATE pedidos 
                SET fecha_pedido = %s, 
                    nombre = %s, 
                    direccion = %s, 
                    telefono = %s, 
                    pedido = %s, 
                    total = %s 
                WHERE id = %s"""
        valores = (
            request.json['fecha_pedido'],
            request.json['nombre'],
            request.json['direccion'],
            request.json['telefono'],
            request.json['pedido'],
            request.json['total'],
            id
        )
        cursor.execute(sql, valores)
        con.connection.commit()
        return jsonify({'mensaje': "Pedido actualizado", "exito": True})
    except Exception as ex:
        return jsonify({'mensaje': f"Error al actualizar pedido: {str(ex)}", "exito": False}), 500

# Agregar endpoint para eliminar pedido
@app.route("/pedidos/<id>", methods=['DELETE'])
def eliminar_pedido(id):
    try:
        pedido = leer_pedido_bd(id)
        if pedido is None:
            return jsonify({'mensaje': 'Pedido no encontrado', 'exito': False})

        cursor = con.connection.cursor()
        sql = "DELETE FROM pedidos WHERE id = %s"
        cursor.execute(sql, (id,))
        con.connection.commit()
        return jsonify({'mensaje': "Pedido eliminado", "exito": True})
    except Exception as ex:
        return jsonify({'mensaje': f"Error al eliminar pedido: {str(ex)}", "exito": False}), 500

def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(host='0.0.0.0', port=5000)