interface ImageParams {
  image: string;
}

export class Image {
  private _image: string;

  private constructor({image}: ImageParams) {
    this._image = image;
  }

  get image() {
    return this._image
  }

  static create({image}: ImageParams) {
    let returnedValue = null;

    try {
      // TODO: Validate...
      returnedValue = new Image({image});
    } catch (error) {
      console.error(error);
    }

    return returnedValue;
  }
}