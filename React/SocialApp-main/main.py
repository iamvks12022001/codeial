
from flask import Flask,jsonify
from project import solve
from final import imagecaption
from flask_cors import CORS ,cross_origin
app = Flask(__name__)

# @app.route("/")
# @cross_origin()
# def hello_world():
#     return "<p>Hello, World!</p>"

# @app.route('/querry/<s>',methods=['POST',"GET"])
# @cross_origin()

c=solve("s1.jpg")
print(c)
# def querry(s):
#     #  if s=="main":
#     #       c=solve()
#     #  else:
#     #      c=imagecaption(s)
#      s1="s1.jpg"
#      c=solve(s)
       
    
#      result={    
        
#          "Desc" :c,
#          "Status" :200,
#      }
#      return jsonify(result)

# if __name__=="__main__":
#     app.run(debug=True)


