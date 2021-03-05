
class ServiceEmail {
  private static instance: ServiceEmail

  public static getInstance(): ServiceEmail {
    if (!ServiceEmail.instance) {
      ServiceEmail.instance = new ServiceEmail()
    }
    return ServiceEmail.instance
  }
}

export default ServiceEmail