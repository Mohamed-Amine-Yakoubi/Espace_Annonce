import React from "react";

export const Footer = () => {
  return (
    <div>
      <section className="fixed-bt">
        <footer className="bg-body-tertiary text-center text-md-start">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase">Footer Content</h5>
                <p>
                  L'utilisation de ce site Internet implique l'acceptation des
                  Conditions générales et du règlement sur le Respect de la vie
                  privée.
                </p>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-body">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-body">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-body">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-body">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-0">Contactez-nous</h5>
 
              </div>
            </div>
          </div>

          <div className="text-center p-3">© 2020 Copyright:Annonces.com</div>
        </footer>
      </section>
    </div>
  );
};
