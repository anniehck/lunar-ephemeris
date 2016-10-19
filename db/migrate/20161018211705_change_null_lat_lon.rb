class ChangeNullLatLon < ActiveRecord::Migration[5.0]
  def change
    change_column_null(:locations, :latitude, true)
    change_column_null(:locations, :longitude, true)
  end
end
