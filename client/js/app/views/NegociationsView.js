class NegociationsView extends ViewBase {

  constructor (element) {
    super(element)
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
          ${model.list.map(item =>`
              <tr>
                <td>${DateHelper.convertDateToText(item.date)}</td>
                <td>${item.quantity}</td>
                <td>${item.value}</td>
                <td>${item.volume}</td>
              </tr>
          `).join('')}
          <tfoot>
            <td colspan="3"></td>
            <td>
              ${model.list.reduce((cur, next) => cur + next.volume, 0.0 )}
            </td>
          </tfoot>
        </tbody>
        
        <tfoot>
        </tfoot>
      </table>
    `
  }

}