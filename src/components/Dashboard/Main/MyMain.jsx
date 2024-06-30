import React from 'react'
import Styles from '../../../assets/css/dashboard/myMain.module.css'
import graph from '../../../assets/images/chart.webp'

export default function MyMain() {
  return (
    <section className={Styles.section}>
      <p className={Styles.intro_text}>Money Insight</p>

      <div className={Styles.page_stats}>
        <div className={Styles.trans_section}>
          <div className={Styles.trans}>
            <i className='fas fa-dollar'></i>
          </div>
          <div className={Styles.para_info}>
            <h5>My Balance</h5>
            <p> $100 </p>
          </div>
          <i className='fas fa-info'></i>
        </div>

        <div className={Styles.trans_section}> 
          <div className={Styles.trans}>
            <i className='fas fa-money-bill'></i>
          </div>
          <div className={Styles.para_info}>
            <h5> Total Loan</h5>
            <p> $482.06k </p>
          </div>
          <i className='fas fa-info'></i>
          
        </div>

        <div className={Styles.trans_section}> 
          <div className={Styles.trans}>
            <i className='fas fa-briefcase'></i>
          </div>
          <div className={Styles.para_info}>
            <h5> Income</h5>
            <p> $482.06k </p>
          </div>
          <i className='fas fa-info'></i>
          
        </div>
        <div className={Styles.trans_section}>
          <div className={Styles.trans}>
            <i className='fas fa-landmark'></i>
          </div>
          <div className={Styles.para_info}>
            <h5>Total Saving</h5>
            <p> $275.78k </p>
          </div>
          <i className='fas fa-info'></i>
          
        </div>

      </div>

      {/* Graph Section */}

      <h4>All Transactions</h4>

      <div className={Styles.table_section}>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> Caps </td>
              <td> name </td>
              <td> gender </td>
              <td> DOD</td>
              <td> cat_name</td>
            </tr>
            <tr>
              <td> Caps </td>
              <td> name </td>
              <td> gender </td>
              <td> DOD</td>
              <td> cat_name</td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  )
}

