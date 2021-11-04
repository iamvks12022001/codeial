
def imagecaption(imagepath):
    from pickle import load
    from numpy import argmax
    from keras.preprocessing.sequence import pad_sequences
    from keras.applications.vgg16 import VGG16
    from keras.preprocessing.image import load_img
    from keras.preprocessing.image import img_to_array
    from keras.applications.vgg16 import preprocess_input
    from keras.models import Model
    from keras.models import load_model

    # extract features from each photo in the directory
    def extract_features(filename):
        # load the model
        model = VGG16()
        # re-structure the model
        model.layers.pop()
        model = Model(inputs=model.inputs, outputs=model.layers[-1].output)
        # load the photo
        image = load_img(filename, target_size=(224, 224))
        # convert the image pixels to a numpy array
        image = img_to_array(image)
        # reshape data for the model
        image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
        # prepare the image for the VGG model
        image = preprocess_input(image)
        # get features
        feature = model.predict(image, verbose=0)
        return feature

    # load the tokenizer
    tokenizer = load(open('/content/drive/MyDrive/project/tokenizer.pkl', 'rb'))
    # pre-define the max sequence length (from training)
    max_length = 34
    # load the model
    model = load_model('/content/drive/MyDrive/project/model_18.h5')
    # load and prepare the photograph
    photo = extract_features(imagepath)
    # generate description
    description = generate_desc(model, tokenizer, photo, max_length)
    #Remove startseq and endseq
    query = description
    stopwords = ['startseq','endseq']
    querywords = query.split()

    resultwords  = [word for word in querywords if word.lower() not in stopwords]
    result = ' '.join(resultwords)

    return(result)