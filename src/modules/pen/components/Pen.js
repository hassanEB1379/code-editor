import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { db } from '../../../indexedDB';
import { penState } from '../states';
import Header from './Header';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';
import Modal from '../../modal/Modal';
import Page404 from '../../../components/404';

// get pen info from IDB (return false if pen not defined)
async function getPen(id) {
   try {
      let pen = await db.pens.get(id);
      if (pen) return pen;
      else return false;
   } catch (err) {
      return false;
   }
}

const Pen = ({ match }) => {
   const id = match.params.id;
   const pen = useState(penState);

   // initialize pen state
   useEffect(() => {
      pen.set(getPen(id));
   }, [id]);

   if (pen.promised) return null;
   if (!pen.get() || pen.error) return <Page404 />;

   return (
      <div className="flex dir-c">
         <Header />
         <ViewLayout />
         <Footer />
         {/*<Modal />*/}
      </div>
   );
};

export default Pen;
